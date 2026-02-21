import {client} from './sanity'
import type {
  HeroData,
  Coach,
  Event,
  Testimonial,
  Retreat,
  PageContent,
  HomePageContent,
} from '@shared/sanity'

// GROQ query for Hero content
export const heroQuery = `*[_type == "hero"][0]{
  _id,
  _type,
  title,
  subtitle,
  description,
  image,
  videoUrl,
  buttonText,
  buttonLink
}`

// GROQ query for Coaches (ordered by order field)
export const coachesQuery = `*[_type == "coach"] | order(order asc){
  _id,
  _type,
  name,
  image,
  bio,
  order
}`

// GROQ query for Events (optionally filtered by year)
export const eventsQuery = (year?: number) => {
  if (year) {
    return `*[_type == "event" && year == ${year}] | order(year asc, month asc){
      _id,
      _type,
      label,
      type,
      year,
      month,
      startDate,
      endDate,
      description
    }`
  }
  return `*[_type == "event"] | order(year asc, month asc){
    _id,
    _type,
    label,
    type,
    year,
    month,
    startDate,
    endDate,
    description
  }`
}

// GROQ query for Testimonials (ordered by order field)
export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc){
  _id,
  _type,
  name,
  date,
  quote,
  image,
  order
}`

// GROQ query for Retreats (only published ones)
export const retreatsQuery = `*[_type == "retreat" && published == true] | order(date asc){
  _id,
  _type,
  title,
  description,
  date,
  price,
  includes,
  location,
  image,
  published
}`

// GROQ query for Page Content by slug
export const pageContentQuery = (slug: string) => `*[_type == "pageContent" && pageSlug.current == "${slug}"][0]{
  _id,
  _type,
  pageSlug,
  title,
  content,
  sections
}`

// GROQ query for Homepage Content
export const homePageContentQuery = `*[_type == "homePageContent"][0]{
  _id,
  _type,
  atmosphereTitle,
  atmosphereDescription,
  atmosphereImages,
  benefitsTitle,
  benefitsDescription,
  benefits,
  coachesTitle,
  coachesSubtitle,
  coachesDescription,
  nextRetreatTitle,
  nextRetreatSectionTitle,
  nextRetreatDescription,
  nextRetreatDuration,
  nextRetreatPrice,
  nextRetreatIncludes,
  nextRetreatBenefits,
  nextRetreatButtonText,
  nextRetreatButtonLink,
  testimonialsTitle,
  newsletterTitle,
  newsletterDescription,
  newsletterButtonText,
  newsletterButtonLink
}`

// Fetch functions with error handling
export async function fetchHero(): Promise<HeroData | null> {
  try {
    const result = await client.fetch<HeroData>(heroQuery)
    return result || null
  } catch (error) {
    console.error('Error fetching hero:', error)
    return null
  }
}

export async function fetchCoaches(): Promise<Coach[]> {
  try {
    const result = await client.fetch<Coach[]>(coachesQuery)
    return result || []
  } catch (error) {
    console.error('Error fetching coaches:', error)
    return []
  }
}

export async function fetchEvents(year?: number): Promise<Event[]> {
  try {
    const query = eventsQuery(year)
    const result = await client.fetch<Event[]>(query)
    return result || []
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    const result = await client.fetch<Testimonial[]>(testimonialsQuery)
    return result || []
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

export async function fetchRetreats(): Promise<Retreat[]> {
  try {
    const result = await client.fetch<Retreat[]>(retreatsQuery)
    return result || []
  } catch (error) {
    console.error('Error fetching retreats:', error)
    return []
  }
}

export async function fetchPageContent(
  slug: string,
): Promise<PageContent | null> {
  try {
    const result = await client.fetch<PageContent>(pageContentQuery(slug))
    return result || null
  } catch (error) {
    console.error(`Error fetching page content for slug "${slug}":`, error)
    return null
  }
}

export async function fetchHomePageContent(): Promise<HomePageContent | null> {
  try {
    const result = await client.fetch<HomePageContent>(homePageContentQuery)
    return result || null
  } catch (error) {
    console.error('Error fetching homepage content:', error)
    return null
  }
}
