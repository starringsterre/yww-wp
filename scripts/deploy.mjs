/**
 * deploy.mjs
 *
 * Full deploy: Vercel frontend + backend sync. Runs in order:
 *   1. Deploy frontend → Vercel (vercel --prod)
 *   2. CMS sync against production WordPress (new fields + fix placeholders)
 *   3. Deploy PHP files to Cloud86 via rsync over SSH
 *   4. Sync WP pages
 *
 * Usage: npm run deploy
 *
 * Required env vars (in .env.production):
 *   WP_URL              – https://cms.youngwisewomen.nl
 *   WP_USER             – WordPress admin username
 *   WP_PASS             – WordPress admin password (or app password)
 *   CLOUD86_SSH_USER    – SSH username for Cloud86
 *   CLOUD86_SSH_HOST    – SSH host IP/hostname for Cloud86
 *   CLOUD86_WP_PATH     – Absolute path to WordPress root on Cloud86
 */

import { spawnSync } from "child_process";
import { existsSync, readFileSync } from "fs";
import { resolve, join } from "path";
import { fileURLToPath } from "url";

const __dir = fileURLToPath(new URL(".", import.meta.url));
const ROOT = resolve(__dir, "..");

// ─────────────────────────────────────────────
// LOAD .env.production
// ─────────────────────────────────────────────

const ENV_FILE = join(ROOT, ".env.production");
if (existsSync(ENV_FILE)) {
  const lines = readFileSync(ENV_FILE, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.substring(0, eq).trim();
    const value = trimmed.substring(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
  console.log("  Loaded .env.production");
} else {
  console.warn(
    "  Warning: .env.production not found. Using environment variables directly."
  );
}

const WP_URL = process.env.WP_URL || "https://cms.youngwisewomen.nl";
const WP_USER = process.env.WP_USER;
const WP_PASS = process.env.WP_PASS;
const CLOUD86_SSH_USER = process.env.CLOUD86_SSH_USER;
const CLOUD86_SSH_HOST = process.env.CLOUD86_SSH_HOST;
const CLOUD86_WP_PATH = process.env.CLOUD86_WP_PATH;

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function step(n, total, label) {
  console.log(`\n${"─".repeat(60)}`);
  console.log(`Step ${n}/${total}: ${label}`);
  console.log("─".repeat(60));
}

function run(cmd, opts = {}) {
  console.log(`  $ ${cmd}`);
  const result = spawnSync(cmd, {
    shell: true,
    stdio: "inherit",
    cwd: ROOT,
    env: process.env,
    ...opts,
  });
  if (result.status !== 0) {
    throw new Error(`Command failed (exit ${result.status}): ${cmd}`);
  }
  return result;
}

function checkEnv(vars) {
  const missing = vars.filter((v) => !process.env[v]);
  if (missing.length > 0) {
    console.error(
      `\n✗ Missing required environment variables:\n  ${missing.join(", ")}\n`
    );
    console.error(
      `  Set them in .env.production or export them before running.\n`
    );
    process.exit(1);
  }
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────

async function main() {
  console.log("\n╔════════════════════════════════════════════╗");
  console.log("║          YWW Deploy                        ║");
  console.log("╚════════════════════════════════════════════╝\n");

  // Validate required env vars
  checkEnv(["WP_USER", "WP_PASS"]);

  const TOTAL_STEPS = 4;

  // ─── Step 1: Deploy frontend to Vercel ───
  step(1, TOTAL_STEPS, "Deploy frontend → Vercel");
  run("vercel --prod");

  // ─── Step 2: CMS sync against production WordPress ───
  step(2, TOTAL_STEPS, `CMS sync → ${WP_URL}`);
  run(
    `WP_URL="${WP_URL}" WP_USER="${WP_USER}" WP_PASS="${WP_PASS}" node scripts/cms-sync.mjs --write --reseed`
  );

  // ─── Step 3: Deploy PHP files to Cloud86 via rsync ───
  step(3, TOTAL_STEPS, "Deploy PHP files → Cloud86");

  if (!CLOUD86_SSH_USER || !CLOUD86_SSH_HOST || !CLOUD86_WP_PATH) {
    console.warn(
      "  Skipping rsync: CLOUD86_SSH_USER, CLOUD86_SSH_HOST, or CLOUD86_WP_PATH not set."
    );
    console.warn(
      "  Add these to .env.production to enable automatic PHP deployment."
    );
  } else {
    const SSH_DEST = `${CLOUD86_SSH_USER}@${CLOUD86_SSH_HOST}`;
    const MU_PLUGINS_SRC = "wordpress/wp-content/mu-plugins/";
    const MU_PLUGINS_DEST = `${SSH_DEST}:${CLOUD86_WP_PATH}/wp-content/mu-plugins/`;

    const THEME_SRC = "wordpress/wp-content/themes/yww-headless/";
    const THEME_DEST = `${SSH_DEST}:${CLOUD86_WP_PATH}/wp-content/themes/yww-headless/`;

    // rsync mu-plugins (yww-admin-ui.php and yww-content-types.php)
    run(
      `rsync -avz --include="yww-*.php" --exclude="*" ` +
        `"${MU_PLUGINS_SRC}" "${MU_PLUGINS_DEST}"`
    );

    // rsync theme (functions.php)
    run(
      `rsync -avz --include="functions.php" --include="index.php" --exclude="*" ` +
        `"${THEME_SRC}" "${THEME_DEST}"`
    );

    console.log("  ✓ PHP files synced to Cloud86");
  }

  // ─── Step 4: Sync WP pages ───
  step(4, TOTAL_STEPS, "Sync WordPress pages");
  run(
    `WP_URL="${WP_URL}" WP_USER="${WP_USER}" WP_PASS="${WP_PASS}" node scripts/sync-wp-pages.mjs`
  );

  console.log("\n╔════════════════════════════════════════════╗");
  console.log("║          Deploy complete! ✓                ║");
  console.log("╚════════════════════════════════════════════╝\n");
}

main().catch((err) => {
  console.error(`\n✗ Deploy failed: ${err.message}\n`);
  process.exit(1);
});
