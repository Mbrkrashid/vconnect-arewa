import { Json } from './common';

export interface AdvertisingTables {
  ad_impressions: {
    Row: {
      id: string
      promotion_id: string | null
      user_id: string | null
      impression_type: string | null
      timestamp: string | null
      device_info: Json | null
      location_info: Json | null
    }
    Insert: {
      id?: string
      promotion_id?: string | null
      user_id?: string | null
      impression_type?: string | null
      timestamp?: string | null
      device_info?: Json | null
      location_info?: Json | null
    }
    Update: {
      id?: string
      promotion_id?: string | null
      user_id?: string | null
      impression_type?: string | null
      timestamp?: string | null
      device_info?: Json | null
      location_info?: Json | null
    }
    Relationships: [
      {
        foreignKeyName: "ad_impressions_promotion_id_fkey"
        columns: ["promotion_id"]
        isOneToOne: false
        referencedRelation: "vendor_promotions"
        referencedColumns: ["id"]
      }
    ]
  }
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