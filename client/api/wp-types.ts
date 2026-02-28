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

export interface WPBlog {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  content?: string;
}

export interface WPGlobalOptions {
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
