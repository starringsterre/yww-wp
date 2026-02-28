/**
 * WordPress REST API client for the YWW headless CMS.
 */

import type {
  WPCoach,
  WPTestimonial,
  WPEvent,
  WPPodcast,
  WPBlog,
  WPGlobalOptions,
} from "./wp-types";

const WP_API_URL =
  import.meta.env.VITE_WP_API_URL || "http://localhost:8081/wp-json";

async function wpFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${WP_API_URL}/yww/v1/${endpoint}`);
  if (!res.ok) {
    throw new Error(`WP API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function fetchCoaches(): Promise<WPCoach[]> {
  return wpFetch<WPCoach[]>("coaches");
}

export async function fetchTestimonials(): Promise<WPTestimonial[]> {
  return wpFetch<WPTestimonial[]>("testimonials");
}

export async function fetchEvents(): Promise<WPEvent[]> {
  return wpFetch<WPEvent[]>("events");
}

export async function fetchPodcasts(): Promise<WPPodcast[]> {
  return wpFetch<WPPodcast[]>("podcasts");
}

export async function fetchBlogs(): Promise<WPBlog[]> {
  return wpFetch<WPBlog[]>("blogs");
}

export async function fetchGlobalOptions(): Promise<WPGlobalOptions> {
  return wpFetch<WPGlobalOptions>("options");
}
