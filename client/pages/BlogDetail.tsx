import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { WPBlogCta } from "@/api/wp-types";
import {
  Check,
  Copy,
  ExternalLink,
  Link2,
  Linkedin,
  Mail,
  MessageCircle,
  Share2,
} from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import SEOHead from "@/components/SEOHead";
import { useBlog } from "@/hooks/useBlog";
import { useBlogs } from "@/hooks/useBlogs";
import { useGlobalSettings } from "@/hooks/useGlobalSettings";
import { resolveSiteLogoUrl, toAbsoluteSiteAssetUrl } from "@/lib/siteBranding";

const SITE_URL = "https://youngwisewomen.nl";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function BlogCtaBlock({ cta }: { cta: WPBlogCta }) {
  const isExternal = cta.buttonUrl.startsWith("http");
  return (
    <div className="not-prose my-10 rounded-2xl bg-[#f5f0e8] p-8">
      {cta.heading && (
        <h2 className="font-['Lora'] text-2xl font-semibold text-[#1c2826]">{cta.heading}</h2>
      )}
      {cta.body && (
        <div
          className="prose prose-sm mt-4 max-w-none text-[#3a4442] prose-ul:text-[#3a4442] prose-li:my-1"
          dangerouslySetInnerHTML={{ __html: cta.body }}
        />
      )}
      {cta.buttonUrl && (
        isExternal ? (
          <a
            href={cta.buttonUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block rounded-full bg-[#B46555] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#a05448]"
          >
            {cta.buttonLabel || "Meer informatie →"}
          </a>
        ) : (
          <Link
            to={cta.buttonUrl}
            className="mt-6 inline-block rounded-full bg-[#B46555] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#a05448]"
          >
            {cta.buttonLabel || "Meer informatie →"}
          </Link>
        )
      )}
    </div>
  );
}

function parseToc(html: string): Array<{ id: string; label: string; level: number }> {
  if (typeof document === "undefined") return [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const headings = Array.from(doc.querySelectorAll("h2[id], h3[id]"));
  return headings.map((el) => ({
    id: el.id,
    label: el.textContent ?? "",
    level: el.tagName === "H2" ? 2 : 3,
  }));
}

export default function BlogDetail() {
  const { slug = "" } = useParams<{ slug: string }>();
  const { data: blog, isLoading } = useBlog(slug);
  const { data: allBlogs } = useBlogs();
  const { data: settings } = useGlobalSettings();
  const siteLogo = toAbsoluteSiteAssetUrl(resolveSiteLogoUrl(settings?.site?.logo), SITE_URL);

  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const articlePath = `/inspiratie/tools-en-handvatten/${slug}`;
  const articleUrl = `${SITE_URL}${articlePath}`;
  const articleTitle = blog?.title ?? "";
  const articleDescription = blog?.excerpt ?? "";

  const virtualHtml = useMemo(() => {
    if (blog?.sections?.length) {
      return blog.sections
        .map((s) => `<h2 id="${slugify(s.heading)}">${s.heading}</h2>${s.body}`)
        .join("\n");
    }
    return blog?.content ?? "";
  }, [blog?.sections, blog?.content]);

  const toc = useMemo(() => parseToc(virtualHtml), [virtualHtml]);

  const otherBlogs = (allBlogs ?? []).filter((b) => (b.slug || b.id) !== slug);

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${articleTitle} ${articleUrl}`)}`;
  const mailUrl = `mailto:?subject=${encodeURIComponent(articleTitle)}&body=${encodeURIComponent(`${articleTitle}\n${articleUrl}`)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // ignore
    }
  };

  const jsonLd = blog
    ? [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: articleTitle,
          description: articleDescription,
          url: articleUrl,
          inLanguage: "nl-NL",
          image: blog.image ? `${SITE_URL}${blog.image.startsWith("/") ? "" : "/"}${blog.image}` : undefined,
          author: {
            "@type": "Organization",
            name: "Young Wise Women",
            url: SITE_URL,
          },
          publisher: {
            "@type": "Organization",
            name: "Young Wise Women",
            logo: {
              "@type": "ImageObject",
              url: siteLogo,
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": articleUrl,
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Inspiratie", item: `${SITE_URL}/inspiratie` },
            { "@type": "ListItem", position: 3, name: "Blogs", item: `${SITE_URL}/inspiratie/tools-en-handvatten` },
            { "@type": "ListItem", position: 4, name: articleTitle, item: articleUrl },
          ],
        },
      ]
    : undefined;

  // Not found / draft state
  if (!isLoading && !blog) {
    return (
      <div className="w-full">
        <SEOHead
          title="Blog niet gevonden | Young Wise Women"
          description=""
          path={articlePath}
        />
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-[#B46555]">
            Niet gevonden
          </p>
          <h1 className="mb-4 font-['Lora'] text-3xl font-semibold text-[#1c2826]">
            Dit artikel is nog niet gepubliceerd
          </h1>
          <p className="mb-8 max-w-md text-[#4f5b58]">
            Dit artikel bestaat nog niet of is nog een concept. Bekijk onze andere blogs.
          </p>
          <Link
            to="/inspiratie/tools-en-handvatten"
            className="rounded-full bg-[#B46555] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#a05448]"
          >
            Alle blogs →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {blog && (
        <SEOHead
          title={`${articleTitle} | Young Wise Women`}
          description={articleDescription}
          path={articlePath}
          ogImage={blog.image}
          ogType="article"
          jsonLd={jsonLd}
        />
      )}

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-[#e8e3da] bg-[#fbf9f5] px-4 py-3 md:px-8"
      >
        <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 text-sm text-[#5c6663]">
          <li>
            <Link to="/" className="transition-colors hover:text-[#B46555]">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-[#b8b2a8]">/</li>
          <li>
            <Link to="/inspiratie" className="transition-colors hover:text-[#B46555]">
              Inspiratie
            </Link>
          </li>
          <li aria-hidden="true" className="text-[#b8b2a8]">/</li>
          <li>
            <Link to="/inspiratie/tools-en-handvatten" className="transition-colors hover:text-[#B46555]">
              Blogs
            </Link>
          </li>
          {blog && (
            <>
              <li aria-hidden="true" className="text-[#b8b2a8]">/</li>
              <li
                className="max-w-[200px] truncate font-medium text-[#1c2826]"
                aria-current="page"
              >
                {blog.title}
              </li>
            </>
          )}
        </ol>
      </nav>

      {/* Article header */}
      <header className="bg-[#fbf9f5] px-4 pb-6 pt-10 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="max-w-3xl font-['Lora'] text-3xl font-semibold leading-tight text-[#1c2826] md:text-4xl lg:text-5xl">
            {isLoading ? <span className="block h-10 w-3/4 animate-pulse rounded bg-[#ece8df]" /> : articleTitle}
          </h1>
          {articleDescription && (
            <p className="mt-4 max-w-2xl text-lg text-[#4f5b58]">{articleDescription}</p>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {blog?.category && (
              <span className="rounded-full bg-[#ece8df] px-3 py-1 text-xs font-medium text-[#4f5b58]">
                {blog.category}
              </span>
            )}
            {blog?.date && (
              <span className="text-sm text-[#5c6663]">{blog.date}</span>
            )}
            {blog?.readTime && (
              <span className="text-sm text-[#5c6663]">{blog.readTime} lezen</span>
            )}
            <button
              type="button"
              onClick={() => setShareOpen(true)}
              aria-haspopup="dialog"
              className="inline-flex items-center gap-2 rounded-full border border-[#d6d0c4] bg-white px-4 py-2 text-sm font-medium text-[#1c2826] transition hover:bg-[#f3efe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Share2 className="h-4 w-4" />
              Deel artikel
            </button>
          </div>
        </div>
      </header>

      {/* Cover image */}
      {(blog?.image || isLoading) && (
        <div className="bg-[#fbf9f5] px-4 pb-8 md:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="aspect-[21/9] overflow-hidden rounded-2xl bg-[#ece8df]">
              {blog?.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main content + sidebar */}
      <div className="bg-[#fbf9f5] px-4 pb-20 md:px-8">
        <div className="mx-auto flex max-w-6xl gap-12 lg:items-start">
          {/* Article body */}
          <article
            className="
              min-w-0 flex-1
              prose prose-lg max-w-none
              prose-headings:font-['Lora'] prose-headings:text-[#1c2826]
              prose-h2:mt-10 prose-h2:text-2xl
              prose-h3:mt-8 prose-h3:text-xl
              prose-p:text-[#3a4442] prose-p:leading-relaxed
              prose-ul:text-[#3a4442]
              prose-ol:text-[#3a4442]
              prose-li:my-1
              prose-strong:text-[#1c2826]
              prose-a:text-[#B46555] prose-a:no-underline hover:prose-a:underline
            "
          >
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-4 animate-pulse rounded bg-[#ece8df]" style={{ width: `${70 + (i % 3) * 10}%` }} />
                ))}
              </div>
            ) : blog?.sections?.length ? (
              <>
                {blog.intro && (
                  <div dangerouslySetInnerHTML={{ __html: blog.intro }} />
                )}
                {blog.sections.map((section, i) => (
                  <div key={i}>
                    <h2 id={slugify(section.heading)}>{section.heading}</h2>
                    <div dangerouslySetInnerHTML={{ __html: section.body }} />
                  </div>
                ))}
                {blog.cta && <BlogCtaBlock cta={blog.cta} />}
                {blog.conclusion && (
                  <div dangerouslySetInnerHTML={{ __html: blog.conclusion }} />
                )}
              </>
            ) : blog?.content ? (
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            ) : null}

            {/* Article footer share */}
            {!isLoading && blog && (
              <div className="not-prose mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#e0dbd2] pt-8">
                <p className="text-sm text-[#5c6663]">Was dit artikel nuttig? Deel het met je netwerk.</p>
                <button
                  type="button"
                  onClick={() => setShareOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-[#d6d0c4] bg-white px-4 py-2 text-sm font-medium text-[#1c2826] transition hover:bg-[#f3efe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Share2 className="h-4 w-4" />
                  Deel artikel
                </button>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="sticky top-24 hidden w-72 shrink-0 space-y-5 lg:block">
            {/* Table of contents */}
            {toc.length > 0 && (
              <div className="rounded-2xl border border-[#e0dbd2] bg-white p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#6f7875]">
                  In dit artikel
                </p>
                <nav aria-label="Inhoudsopgave">
                  <ul className="space-y-1.5">
                    {toc.map((item) => (
                      <li key={item.id} style={{ paddingLeft: item.level === 3 ? "0.75rem" : undefined }}>
                        <a
                          href={`#${item.id}`}
                          className="block py-0.5 text-sm text-[#4f5b58] transition-colors hover:text-[#B46555]"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}

            {/* Other blogs */}
            {otherBlogs.length > 0 && (
              <div className="rounded-2xl border border-[#e0dbd2] bg-white p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#6f7875]">
                  Andere blogs
                </p>
                <ul className="space-y-4">
                  {otherBlogs.map((b) => (
                    <li key={b.id}>
                      <Link
                        to={`/inspiratie/tools-en-handvatten/${b.slug || b.id}`}
                        className="group flex items-start gap-3"
                      >
                        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[#ece8df]">
                          <img
                            src={b.image}
                            alt={b.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <p className="text-sm font-medium leading-snug text-[#1c2826] transition-colors group-hover:text-[#B46555]">
                          {b.title}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/inspiratie/tools-en-handvatten"
                  className="mt-4 block text-sm font-medium text-[#B46555] transition-colors hover:underline"
                >
                  Alle blogs →
                </Link>
              </div>
            )}

            {/* Share */}
            <div className="rounded-2xl border border-[#e0dbd2] bg-white p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#6f7875]">
                Deel dit artikel
              </p>
              <div className="space-y-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-[#e0dbd2] px-3 py-2.5 text-sm font-medium text-[#1c2826] transition hover:bg-[#f3efe7]"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#e9f9ef] text-[#1f7a46]">
                    <MessageCircle className="h-3.5 w-3.5" />
                  </span>
                  WhatsApp
                </a>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-[#e0dbd2] px-3 py-2.5 text-sm font-medium text-[#1c2826] transition hover:bg-[#f3efe7]"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#e8f0fb] text-[#1f5fbe]">
                    <Linkedin className="h-3.5 w-3.5" />
                  </span>
                  LinkedIn
                </a>
                <button
                  type="button"
                  onClick={() => void handleCopyLink()}
                  className="flex w-full items-center gap-3 rounded-xl border border-[#e0dbd2] px-3 py-2.5 text-left text-sm font-medium text-[#1c2826] transition hover:bg-[#f3efe7]"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#eef1f4] text-[#40505b]">
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-[#2f6f4c]" />
                    ) : (
                      <Link2 className="h-3.5 w-3.5" />
                    )}
                  </span>
                  {copied ? "Gekopieerd!" : "Kopieer link"}
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Share dialog */}
      <Dialog open={shareOpen} onOpenChange={setShareOpen}>
        <DialogContent className="w-[92vw] max-w-md overflow-hidden rounded-2xl border border-[#d8d2c7] bg-[#fbf9f5] p-0 text-[#1c2826] shadow-2xl">
          <div className="relative bg-gradient-to-r from-[#ece7dc] via-[#efe9de] to-[#e5ddcf] px-6 pb-5 pt-6">
            <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-[#b46555]/20 blur-2xl" />
            <div className="pointer-events-none absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-[#9ca08a]/25 blur-2xl" />
            <div className="relative flex items-start gap-3">
              <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/75 text-[#1c2826] shadow-sm">
                <Share2 className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle className="font-['Lora'] text-2xl font-semibold leading-tight">
                  Deel artikel
                </DialogTitle>
                <DialogDescription className="mt-1 text-sm text-[#5c6663]">
                  {articleTitle}
                </DialogDescription>
              </div>
            </div>
            <a
              href={articleUrl}
              target="_blank"
              rel="noreferrer"
              className="relative mt-4 inline-flex items-center gap-2 rounded-full border border-[#d6d0c4] bg-white/90 px-3 py-1.5 text-xs font-medium text-[#2a3835] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Bekijk artikel
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="space-y-2 p-6 pt-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-xl border border-[#ddd6ca] bg-white px-4 py-3 text-sm font-medium transition hover:bg-[#f3efe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              onClick={() => setShareOpen(false)}
            >
              <span className="inline-flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#e9f9ef] text-[#1f7a46]">
                  <MessageCircle className="h-4 w-4" />
                </span>
                Share via WhatsApp
              </span>
              <ExternalLink className="h-4 w-4 text-[#6f7875]" />
            </a>
            <a
              href={mailUrl}
              className="flex items-center justify-between rounded-xl border border-[#ddd6ca] bg-white px-4 py-3 text-sm font-medium transition hover:bg-[#f3efe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              onClick={() => setShareOpen(false)}
            >
              <span className="inline-flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f8ede9] text-[#a55746]">
                  <Mail className="h-4 w-4" />
                </span>
                Share via e-mail
              </span>
              <ExternalLink className="h-4 w-4 text-[#6f7875]" />
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-xl border border-[#ddd6ca] bg-white px-4 py-3 text-sm font-medium transition hover:bg-[#f3efe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              onClick={() => setShareOpen(false)}
            >
              <span className="inline-flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#e8f0fb] text-[#1f5fbe]">
                  <Linkedin className="h-4 w-4" />
                </span>
                Share via LinkedIn
              </span>
              <ExternalLink className="h-4 w-4 text-[#6f7875]" />
            </a>
            <button
              type="button"
              onClick={() => void handleCopyLink()}
              className="flex w-full items-center justify-between rounded-xl border border-[#ddd6ca] bg-white px-4 py-3 text-left text-sm font-medium transition hover:bg-[#f3efe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="inline-flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#eef1f4] text-[#40505b]">
                  <Link2 className="h-4 w-4" />
                </span>
                Kopieer link
              </span>
              {copied ? (
                <span className="inline-flex items-center gap-1 text-[#2f6f4c]">
                  <Check className="h-4 w-4" />
                  Gekopieerd
                </span>
              ) : (
                <Copy className="h-4 w-4 text-[#6f7875]" />
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
