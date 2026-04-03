import { createClient } from '@supabase/supabase-js'

export type PlatformPosition = {
  id: string
  issue: string
  issue_icon: string
  category: 'economic' | 'governance' | 'social' | 'foreign' | 'environment'
  dem_position: string
  rep_position: string
  peoples_position: string
  our_detail: string | null
  priority: number
  active: boolean
  updated_at: string
}

export type Subscriber = {
  id: string
  email: string
  name: string | null
  zip_code: string | null
  message: string | null
  created_at: string
}

export type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  author: string
  published: boolean
  published_at: string | null
  created_at: string
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
