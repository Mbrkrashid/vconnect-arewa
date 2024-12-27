import { AdvertisingTables } from './advertising'
import { SupportTables } from './support'
import { Json } from './common'

export interface Database {
  public: {
    Tables: {
      ad_impressions: {
        Row: {
          device_info: Json | null
          id: string
          impression_type: string | null
          location_info: Json | null
          promotion_id: string | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          device_info?: Json | null
          id?: string
          impression_type?: string | null
          location_info?: Json | null
          promotion_id?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          device_info?: Json | null
          id?: string
          impression_type?: string | null
          location_info?: Json | null
          promotion_id?: string | null
          timestamp?: string | null
          user_id?: string | null
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
      brand_campaigns: AdvertisingTables['brand_campaigns']
      support_tickets: SupportTables['support_tickets']
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          role: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          role?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          role?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      vendors: {
        Row: {
          address: string | null
          business_name: string
          business_type: string | null
          created_at: string | null
          description: string | null
          email: string
          id: string
          is_verified: boolean | null
          opay_wallet_id: string | null
          phone_number: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          business_name: string
          business_type?: string | null
          created_at?: string | null
          description?: string | null
          email: string
          id: string
          is_verified?: boolean | null
          opay_wallet_id?: string | null
          phone_number?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          business_name?: string
          business_type?: string | null
          created_at?: string | null
          description?: string | null
          email?: string
          id?: string
          is_verified?: boolean | null
          opay_wallet_id?: string | null
          phone_number?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string | null
          category_id: string | null
          created_at: string
          description: string | null
          id: string
          images: string[] | null
          is_promoted: boolean | null
          name: string
          price: number
          promotion_end_date: string | null
          promotion_start_date: string | null
          promotion_type: string | null
          rating: number | null
          reviews_count: number | null
          sku: string | null
          stock_quantity: number
          updated_at: string
          vendor_id: string | null
        }
        Insert: {
          category?: string | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          is_promoted?: boolean | null
          name: string
          price: number
          promotion_end_date?: string | null
          promotion_start_date?: string | null
          promotion_type?: string | null
          rating?: number | null
          reviews_count?: number | null
          sku?: string | null
          stock_quantity: number
          updated_at?: string
          vendor_id?: string | null
        }
        Update: {
          category?: string | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          is_promoted?: boolean | null
          name?: string
          price?: number
          promotion_end_date?: string | null
          promotion_start_date?: string | null
          promotion_type?: string | null
          rating?: number | null
          reviews_count?: number | null
          sku?: string | null
          stock_quantity?: number
          updated_at?: string
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          }
        ]
      }
      transactions: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          customer_id: string | null
          id: string
          metadata: Json | null
          opay_transaction_id: string | null
          payment_method: string | null
          product_id: string | null
          status: string | null
          updated_at: string | null
          vendor_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          customer_id?: string | null
          id?: string
          metadata?: Json | null
          opay_transaction_id?: string | null
          payment_method?: string | null
          product_id?: string | null
          status?: string | null
          updated_at?: string | null
          vendor_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          customer_id?: string | null
          id?: string
          metadata?: Json | null
          opay_transaction_id?: string | null
          payment_method?: string | null
          product_id?: string | null
          status?: string | null
          updated_at?: string | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          }
        ]
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      video_content: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          likes_count: number | null
          shares_count: number | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          vendor_id: string
          video_url: string
          views_count: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          likes_count?: number | null
          shares_count?: number | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          vendor_id: string
          video_url: string
          views_count?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          likes_count?: number | null
          shares_count?: number | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          vendor_id: string
          video_url?: string
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "video_content_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          }
        ]
      }
      video_comments: {
        Row: {
          comment: string
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string
          video_id: string
        }
        Insert: {
          comment: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
          video_id: string
        }
        Update: {
          comment?: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_comments_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "video_content"
            referencedColumns: ["id"]
          }
        ]
      }
      video_interactions: {
        Row: {
          created_at: string | null
          id: string
          interaction_type: string
          user_id: string
          video_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          interaction_type: string
          user_id: string
          video_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          interaction_type?: string
          user_id?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_interactions_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "video_content"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type * from './common'
export type * from './advertising'
export type * from './support'
