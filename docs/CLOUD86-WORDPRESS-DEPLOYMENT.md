# WordPress Headless CMS Deployment op Cloud86

## Overzicht

WordPress draait als headless CMS op `cms.youngwisewomen.nl` (Cloud86 shared hosting met Plesk).
De React frontend op Vercel haalt content op via de REST API.

## Credentials & Toegang

- **CMS admin**: https://cms.youngwisewomen.nl/wp-admin
- **WP user**: `admin` / `YWW-cms-2026!`
- **API basis**: https://cms.youngwisewomen.nl/wp-json/yww/v1/
- **SSH**: `zeysltvh@45.82.189.195` (wachtwoord in Plesk System User Credentials)
- **Database**: `zeysltvh_cms` / user `yww_cms` / host `localhost:3306`
- **Application Password** (voor REST API schrijfacties): `pii6 a7Lv T0ZU gQNB Qj8o Jslq`

## Architectuur

```
[Vercel Frontend]  --fetch-->  [Cloud86 WordPress REST API]
  yww2.vercel.app                cms.youngwisewomen.nl/wp-json/

Vercel env var: VITE_WP_API_URL=https://cms.youngwisewomen.nl/wp-json
```

## Hosting Setup (Cloud86 / Plesk)

### Subdomein aanmaken
1. Plesk → Websites & Domains → **Add Subdomain** → `cms.youngwisewomen.nl`
2. Document root: `cms.youngwisewomen.nl` (Plesk maakt de map automatisch aan)
3. SSL/TLS → **Let's Encrypt** certificaat selecteren + HTTPS redirect aan
4. SSH access → Type van "Forbidden" naar `/bin/bash` zetten
5. System user credentials → wachtwoord genereren/instellen

### Database aanmaken
- Plesk → Databases → Add Database
- Related site: `cms.youngwisewomen.nl`
- Database naam, gebruiker en wachtwoord noteren

## Installatie Stappen (via SSH + WP-CLI)

Cloud86 shared hosting heeft WP-CLI voorgeïnstalleerd op `/usr/local/bin/wp`.

```bash
# 1. WordPress downloaden
cd cms.youngwisewomen.nl
wp core download --locale=nl_NL

# 2. wp-config.php aanmaken
wp config create --dbname=zeysltvh_cms --dbuser=yww_cms --dbpass="WACHTWOORD" --dbhost=localhost:3306 --locale=nl_NL

# 3. WordPress installeren
wp core install --url=https://cms.youngwisewomen.nl --title="YWW Headless CMS" --admin_user=admin --admin_password="YWW-cms-2026!" --admin_email=info@youngwisewomen.nl --locale=nl_NL

# 4. Permalinks instellen (nodig voor REST API)
wp rewrite structure "/%postname%/" && wp rewrite flush

# 5. Application Password aanmaken (voor REST API auth)
wp user application-password create admin yww-sync-script --porcelain
```

### .htaccess (CRUCIAAL)

WordPress maakt GEEN `.htaccess` aan via WP-CLI. Zonder dit bestand werkt de REST API niet (404).
Handmatig aanmaken in `cms.youngwisewomen.nl/.htaccess`:

```apache
# BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>
# END WordPress
```

De `HTTP_AUTHORIZATION` rewrite regel is essentieel voor Basic Auth / Application Passwords.

## Mu-Plugins

Geüpload naar `cms.youngwisewomen.nl/wp-content/mu-plugins/` via SCP:

| Bestand | Functie |
|---------|---------|
| `yww-content-types.php` | Custom post types, meta fields, REST endpoints |
| `yww-admin-ui.php` | Admin meta boxes voor content bewerking |
| `yww-cors.php` | CORS headers voor Vercel frontend |

### CORS plugin (`yww-cors.php`)

Staat alleen specifieke origins toe:
- `https://youngwisewomen.nl`
- `https://www.youngwisewomen.nl`
- `https://yww2.vercel.app`

Bij nieuw Vercel domein → origin toevoegen in dit bestand.

## Seeding & Data Migratie

### Lesson Learned: REST API slaat meta NIET op

**Probleem**: De seed scripts (`scripts/seed-wordpress.mjs`) sturen `meta` mee in POST requests naar `/wp-json/wp/v2/yww_coach` etc. Lokaal werkt dit, maar op Cloud86 productie worden meta fields **stil genegeerd** — de post wordt aangemaakt, maar alle meta is leeg.

**Oorzaak**: Onduidelijk. Waarschijnlijk gerelateerd aan hoe `register_post_meta()` + `show_in_rest` interacteert met Application Passwords op shared hosting. De REST API geeft 201 success maar slaat de meta niet op.

**Oplossing**: Seed via **WP-CLI `wp eval-file`** met een PHP script dat `wp_insert_post()` + `update_post_meta()` gebruikt. Dit werkt altijd betrouwbaar.

```bash
# Upload PHP seed script
scp yww-seed-cli.php zeysltvh@45.82.189.195:cms.youngwisewomen.nl/

# Draai via WP-CLI
ssh zeysltvh@45.82.189.195
cd cms.youngwisewomen.nl
wp eval-file yww-seed-cli.php
rm yww-seed-cli.php
```

### Lesson Learned: Pagina-content migratie

**Probleem**: `sync-wp-pages.mjs` maakt pagina's aan met lege `yww_page_content: "{}"`. De echte teksten (hero, secties, CTA's) zitten in de lokale WP database als JSON in het `yww_page_content` meta veld.

**Probleem 2**: PHP `eval-file` met base64-encoded content gaf geen output/errors — silent failure bij grote strings.

**Oplossing die wél werkte**: Per pagina een `.txt` bestand met de JSON content uploaden, en dan via shell script:

```bash
# Per pagina: meta updaten vanuit bestand
wp post meta update {PAGE_ID} yww_page_content < yww-page-{PAGE_ID}.txt
wp post update {PAGE_ID} --post_status=publish
```

### Lesson Learned: Pagina-slugs mapping

Lokale WP en productie hebben **andere slugs**. Mapping nodig:

| Lokale slug | Productie slug | Page ID |
|-------------|---------------|---------|
| home | home | 27 |
| groepstrainingen | groepstrainingen | 28 |
| workshops | ontwikkeling-workshops | 29 |
| weekenden | persoonlijke-ontwikkeling-weekend-training | 30 |
| weekend-intensive | weekend-intensive-juni-2026 | 31 |
| voor-organisaties | in-company | 32 |
| jaarprogrammas | jaarprogrammas | 33 |
| losse-workshops | losse-workshops | 34 |
| inspiratie | inspiratie | 35 |
| kalender | evenementen | 36 |
| ons-verhaal | ons-verhaal | 37 |
| lid-worden | lid-worden | 38 |

### Lesson Learned: Admin UI toont velden maar niet de content

De `yww-admin-ui.php` plugin leest `yww_page_content` als JSON en rendert losse input velden per key. Als de meta wél is opgeslagen (via `wp post meta get` zichtbaar) maar de admin UI lege velden toont, dan kan het zijn dat:

1. De JSON keys in de meta niet matchen met wat de admin UI verwacht
2. De pagina nog als "Concept" (draft) staat — publiceer de pagina
3. De browser een gecachte versie toont — hard refresh (Cmd+Shift+R)

## Vercel Configuratie

```bash
# Env var instellen
npx vercel env add VITE_WP_API_URL production --yes <<< "https://cms.youngwisewomen.nl/wp-json"

# Redeployen na wijziging
npx vercel --prod --yes
```

## Nuttige Commando's

```bash
# SSH verbinding (met expect voor wachtwoord, of gebruik SSH keys)
ssh zeysltvh@45.82.189.195

# WP-CLI op Cloud86
cd ~/cms.youngwisewomen.nl
wp post list --post_type=page --fields=ID,post_name,post_status --format=table
wp post meta get {ID} yww_page_content | head -c 200
wp post meta update {ID} yww_page_content < content.txt

# Lokaal: sync nieuwe pagina's naar productie
WP_URL=https://cms.youngwisewomen.nl WP_USER=admin WP_PASS='pii6 a7Lv T0ZU gQNB Qj8o Jslq' pnpm sync:wp-pages

# Test API endpoints
curl -s https://cms.youngwisewomen.nl/wp-json/yww/v1/coaches
curl -s https://cms.youngwisewomen.nl/wp-json/yww/v1/testimonials
curl -s https://cms.youngwisewomen.nl/wp-json/yww/v1/blogs
```

## Nog te doen

- [ ] DNS van `youngwisewomen.nl` naar Vercel wijzen (dan wordt dat de echte frontend URL)
- [ ] Oude lege WP installatie op `youngwisewomen.nl` opruimen
- [ ] SSH key-based auth instellen (ipv wachtwoord)
- [ ] Onderzoeken waarom REST API meta niet opslaat op productie (voor toekomstige sync scripts)
