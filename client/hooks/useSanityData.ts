import {useState, useEffect} from 'react'
import {
  fetchHero,
  fetchCoaches,
  fetchEvents,
  fetchTestimonials,
  fetchRetreats,
  fetchPageContent,
  fetchHomePageContent,
} from '@/lib/sanityQueries'
import type {
  HeroData,
  Coach,
  Event,
  Testimonial,
  Retreat,
  PageContent,
  HomePageContent,
} from '@shared/sanity'

export function useHero() {
  const [data, setData] = useState<HeroData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const heroData = await fetchHero()
        setData(heroData)
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to fetch hero data'),
        )
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  return {data, loading, error}
}

export function useCoaches() {
  const [data, setData] = useState<Coach[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const coachesData = await fetchCoaches()
        setData(coachesData)
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error('Failed to fetch coaches data'),
        )
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  return {data, loading, error}
}

export function useEvents(year?: number) {
  const [data, setData] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const eventsData = await fetchEvents(year)
        setData(eventsData)
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to fetch events data'),
        )
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [year])

  return {data, loading, error}
}

export function useTestimonials() {
  const [data, setData] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const testimonialsData = await fetchTestimonials()
        setData(testimonialsData)
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error('Failed to fetch testimonials data'),
        )
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  return {data, loading, error}
}

export function useRetreats() {
  const [data, setData] = useState<Retreat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const retreatsData = await fetchRetreats()
        setData(retreatsData)
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error('Failed to fetch retreats data'),
        )
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  return {data, loading, error}
}

export function usePageContent(slug: string) {
  const [data, setData] = useState<PageContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const pageContentData = await fetchPageContent(slug)
        setData(pageContentData)
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error(`Failed to fetch page content for slug "${slug}"`),
        )
      } finally {
        setLoading(false)
      }
    }
    if (slug) {
      loadData()
    } else {
      setLoading(false)
    }
  }, [slug])

  return {data, loading, error}
}

export function useHomePageContent() {
  const [data, setData] = useState<HomePageContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const homePageContentData = await fetchHomePageContent()
        setData(homePageContentData)
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error('Failed to fetch homepage content'),
        )
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  return {data, loading, error}
}
