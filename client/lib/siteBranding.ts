export const DEFAULT_SITE_LOGO = "https://cms.youngwisewomen.nl/wp-content/uploads/2026/03/logo-young-wise-women.png";
export const SITE_BASE_URL = "https://youngwisewomen.nl";

export function resolveSiteLogoUrl(logoUrl?: string | null) {
  return logoUrl && logoUrl.trim() ? logoUrl : DEFAULT_SITE_LOGO;
}

export function toAbsoluteSiteAssetUrl(
  pathOrUrl: string,
  baseUrl = SITE_BASE_URL,
) {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  return `${baseUrl}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}
