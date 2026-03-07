/**
 * TypeScript interfaces for WordPress REST API responses.
 * These match the shape returned by /wp-json/yww/v1/* endpoints.
 */

export interface WPCoach {
  id: number;
  name: string;
  bio: string;
  role: string;
  image: string;
  order: number;
}

export interface WPTestimonial {
  id: number;
  name: string;
  date: string;
  quote: string;
  image: string;
  order: number;
}

export interface WPEvent {
  id: number;
  label: string;
  type:
    | "weekend-training"
    | "workshop"
    | "terugkom-dag"
    | "retreat"
    | "mini-retreat"
    | "sunday-gathering"
    | "creative-event";
  year: number;
  month: number;
  startDate: string;
  endDate: string;
  description: string;
  link: string;
}

export interface WPPodcast {
  id: number;
  title: string;
  teaser: string;
  duration: string;
  date: string;
  guest: string;
  thumbnailUrl: string;
  youtubeUrl: string;
  spotifyUrl: string;
}

export interface WPBlogSection {
  heading: string;
  body: string;
}

export interface WPBlogCta {
  heading: string;
  body: string;
  buttonLabel: string;
  buttonUrl: string;
}

export interface WPBlog {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  slug?: string;
  // HTML fallback for posts without structured content
  content?: string;
  // Structured content fields
  date?: string;
  category?: string;
  readTime?: string;
  intro?: string;
  sections?: WPBlogSection[];
  cta?: WPBlogCta;
  conclusion?: string;
}

export interface WPGlobalOptions {
  site: {
    logo: string;
  };
  footer: {
    about_text: string;
    copyright: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  social: {
    instagram: string;
    linkedin: string;
  };
  brands: Array<{
    name: string;
    logo: string;
  }>;
}

/** Generic page content — a flat key/value map returned by /yww/v1/pages/{slug} */
export type WPPageContent = Record<string, string>;

export interface WPWorkshop {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  nextDate: string;
  fromPrice: string;
  duration: string;
  location: string;
  audience: string;
  goal: string;
  program: string[];
  investment: string;
  order: number;
}

export interface WPFAQ {
  id: number;
  question: string;
  answer: string;
  page: string;
  order: number;
}
