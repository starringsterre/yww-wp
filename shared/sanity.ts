// Sanity Image Reference type
export interface SanityImageReference {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

// Hero Content Type
export interface HeroData {
  _id?: string;
  _type?: 'hero';
  title?: string;
  subtitle?: string;
  description?: string; // Deprecated, gebruik subtitle
  image?: SanityImageReference;
  videoUrl?: string;
  buttonText?: string;
  buttonLink?: string;
}

// Coach Content Type
export interface Coach {
  _id?: string;
  _type?: 'coach';
  name: string;
  image: SanityImageReference;
  bio: string;
  order?: number;
}

// Event Type
export type EventType =
  | 'weekend-training'
  | 'workshop'
  | 'terugkom-dag'
  | 'retreat'
  | 'mini-retreat'
  | 'sunday-gathering'
  | 'creative-event';

// Event Content Type
export interface Event {
  _id?: string;
  _type?: 'event';
  label: string;
  type: EventType;
  year: number;
  month: number; // 1-12
  startDate?: string;
  endDate?: string;
  description?: string;
}

// Testimonial Content Type
export interface Testimonial {
  _id?: string;
  _type?: 'testimonial';
  name: string;
  date: string;
  quote: string;
  image: SanityImageReference;
  order?: number;
}

// Retreat Content Type
export interface Retreat {
  _id?: string;
  _type?: 'retreat';
  title: string;
  description: string;
  date: string;
  price: number;
  includes: string[];
  location?: string;
  image?: SanityImageReference;
  published: boolean;
}

// Page Content Type
export interface PageContent {
  _id?: string;
  _type?: 'pageContent';
  pageSlug: string;
  title: string;
  content?: any; // PortableText / block content
  sections?: any[]; // Array of different section types
}

// Benefit Item Type
export interface BenefitItem {
  icon: 'Flower' | 'Heart' | 'Zap' | 'Hammer';
  title: string;
  description: string;
}

// Retreat Benefit Item Type
export interface RetreatBenefitItem {
  icon?: 'Flower' | 'Heart' | 'Zap';
  title?: string;
  description?: string;
}

// Homepage Content Type
export interface HomePageContent {
  _id?: string;
  _type?: 'homePageContent';
  atmosphereTitle?: string;
  atmosphereDescription?: string;
  atmosphereImages?: SanityImageReference[];
  benefitsTitle?: string;
  benefitsDescription?: string;
  benefits?: BenefitItem[];
  coachesTitle?: string;
  coachesSubtitle?: string;
  coachesDescription?: string;
  nextRetreatTitle?: string;
  nextRetreatSectionTitle?: string;
  nextRetreatDescription?: string;
  nextRetreatDuration?: string;
  nextRetreatPrice?: number;
  nextRetreatIncludes?: string[];
  nextRetreatBenefits?: RetreatBenefitItem[];
  nextRetreatButtonText?: string;
  nextRetreatButtonLink?: string;
  testimonialsTitle?: string;
  newsletterTitle?: string;
  newsletterDescription?: string;
  newsletterButtonText?: string;
  newsletterButtonLink?: string;
}
