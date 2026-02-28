import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: [".", "./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
    proxy: {
      "/wp-admin": {
        target: "http://localhost:8081",
        headers: { host: "localhost:8080" },
      },
      "/wp-login.php": {
        target: "http://localhost:8081",
        headers: { host: "localhost:8080" },
      },
      "/wp-json": {
        target: "http://localhost:8081",
        headers: { host: "localhost:8080" },
      },
      "/wp-content": {
        target: "http://localhost:8081",
        headers: { host: "localhost:8080" },
      },
      "/wp-includes": {
        target: "http://localhost:8081",
        headers: { host: "localhost:8080" },
      },
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), wpAdminPlugin(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function wpAdminPlugin(): Plugin {
  return {
    name: "wp-admin-redirect",
    apply: "serve",
    configureServer(server) {
      // Ensure /wp-admin has trailing slash so relative links resolve correctly
      server.middlewares.use((req, _res, next) => {
        if (req.url === "/wp-admin") {
          _res.writeHead(301, { Location: "/wp-admin/" });
          _res.end();
          return;
        }
        next();
      });
    },
  };
}

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Add Express app as middleware to Vite dev server
      server.middlewares.use(app);
    },
  };
}
