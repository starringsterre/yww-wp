import { Helmet } from "react-helmet-async";
import { useGlobalSettings } from "@/hooks/useGlobalSettings";
import { resolveSiteLogoUrl, SITE_BASE_URL, toAbsoluteSiteAssetUrl } from "@/lib/siteBranding";

export interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  slug?: string;
  noindex?: boolean;
}

const SITE_NAME = "Young Wise Women";
const BASE_URL = SITE_BASE_URL;

export default function SEOHead({
  title,
  description,
  path,
  ogImage,
  ogType = "website",
  jsonLd,
  noindex = false,
}: SEOHeadProps) {
  const { data: settings } = useGlobalSettings();
  const canonicalUrl = `${BASE_URL}${path}`;
  const image = toAbsoluteSiteAssetUrl(
    ogImage || resolveSiteLogoUrl(settings?.site?.logo),
    BASE_URL,
  );

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="nl_NL" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
