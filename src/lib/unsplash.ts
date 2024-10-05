const BASE_URL = 'https://api.unsplash.com/'
const ACCESS_KEY = import.meta.env.VITE_APP_UNSPLASH_ACC_KEY

type SearchFilters = {
  query?: string
  page?: number
  per_page?: number
  order_by?: 'relevant' | 'latest'
}

type User = {
  id: string
  username: string
  name: string
  first_name: string
  last_name: string
  instagram_username: string
  twitter_username: string
  portfolio_url: string
  location: string
  profile_image: {
    small: string
    medium: string
    large: string
  }
  links: {
    self: string
    html: string
    photos: string
    likes: string
  }
}

export type UnsplashPhoto = {
  id: string
  created_at: string
  width: number
  height: number
  color: string
  blur_hash: string
  likes: number
  liked_by_user: boolean
  description: string
  alt_description: string
  user: User
  current_user_collections: any[]
  urls: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
  }
  links: {
    self: string
    html: string
    download: string
  }
  breadcrumbs: { slug: string; title: string; index: number; type: string }[]
}

export type SearchResults = {
  total: number
  total_pages: number
  results: UnsplashPhoto[]
}

type UnsplashError = {
  errors: string[]
}

async function search(filters: SearchFilters) {
  const resp = await fetch(
    `${BASE_URL}/search/photos?query=${filters.query}&page=${filters.page || 1}&per_page=${filters.per_page || 8}&order_by=${filters.order_by || 'relevant'}`,
    {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`
      }
    }
  )

  const results = await resp.json()

  if (!resp.ok) {
    const errors: UnsplashError['errors'] = results.errors
    if (errors) {
      throw new Error(errors.join(', '))
    }
  }

  return results as SearchResults
}

export const unsplashAPI = Object.freeze({
  search
})
