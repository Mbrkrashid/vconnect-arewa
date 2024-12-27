import { Json } from './common'

export interface AdvertisingTables {
  brand_campaigns: {
    Row: {
      id: string
      brand_name: string
      campaign_title: string
      description: string | null
      budget: number
      start_date: string
      end_date: string
      status: string | null
      ad_placement: string | null
      target_audience: string | null
      metrics: Json | null
      created_at: string | null
      updated_at: string | null
    }
    Insert: {
      id?: string
      brand_name: string
      campaign_title: string
      description?: string | null
      budget: number
      start_date: string
      end_date: string
      status?: string | null
      ad_placement?: string | null
      target_audience?: string | null
      metrics?: Json | null
      created_at?: string | null
      updated_at?: string | null
    }
    Update: {
      id?: string
      brand_name?: string
      campaign_title?: string
      description?: string | null
      budget?: number
      start_date?: string
      end_date?: string
      status?: string | null
      ad_placement?: string | null
      target_audience?: string | null
      metrics?: Json | null
      created_at?: string | null
      updated_at?: string | null
    }
    Relationships: []
  }
}