export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
          },
        ]
      }
      branded_effects: {
        Row: {
          created_at: string | null
          effect_data: Json
          effect_name: string
          effect_type: string
          id: string
          promotion_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          effect_data: Json
          effect_name: string
          effect_type: string
          id?: string
          promotion_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          effect_data?: Json
          effect_name?: string
          effect_type?: string
          id?: string
          promotion_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "branded_effects_promotion_id_fkey"
            columns: ["promotion_id"]
            isOneToOne: false
            referencedRelation: "vendor_promotions"
            referencedColumns: ["id"]
          },
        ]
      }
      hashtag_challenges: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string
          hashtag: string
          id: string
          participation_count: number | null
          prize_details: Json | null
          promotion_id: string | null
          start_date: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date: string
          hashtag: string
          id?: string
          participation_count?: number | null
          prize_details?: Json | null
          promotion_id?: string | null
          start_date: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string
          hashtag?: string
          id?: string
          participation_count?: number | null
          prize_details?: Json | null
          promotion_id?: string | null
          start_date?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hashtag_challenges_promotion_id_fkey"
            columns: ["promotion_id"]
            isOneToOne: false
            referencedRelation: "vendor_promotions"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          is_promoted: boolean | null
          name: string
          price: number
          promotion_end_date: string | null
          promotion_start_date: string | null
          promotion_type: string | null
          sku: string | null
          stock_quantity: number
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_promoted?: boolean | null
          name: string
          price: number
          promotion_end_date?: string | null
          promotion_start_date?: string | null
          promotion_type?: string | null
          sku?: string | null
          stock_quantity?: number
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_promoted?: boolean | null
          name?: string
          price?: number
          promotion_end_date?: string | null
          promotion_start_date?: string | null
          promotion_type?: string | null
          sku?: string | null
          stock_quantity?: number
          updated_at?: string
        }
        Relationships: []
      }
      vendor_promotions: {
        Row: {
          ad_format: string | null
          ad_placement: string | null
          budget: number | null
          clicks_count: number | null
          created_at: string | null
          daily_spend_limit: number | null
          end_date: string
          id: string
          payment_amount: number | null
          payment_method: string | null
          payment_status: string | null
          performance_metrics: Json | null
          product_id: string | null
          promotion_type: string
          start_date: string
          status: string | null
          target_audience: string | null
          targeting_criteria: Json | null
          updated_at: string | null
          vendor_id: string | null
          views_count: number | null
        }
        Insert: {
          ad_format?: string | null
          ad_placement?: string | null
          budget?: number | null
          clicks_count?: number | null
          created_at?: string | null
          daily_spend_limit?: number | null
          end_date: string
          id?: string
          payment_amount?: number | null
          payment_method?: string | null
          payment_status?: string | null
          performance_metrics?: Json | null
          product_id?: string | null
          promotion_type: string
          start_date: string
          status?: string | null
          target_audience?: string | null
          targeting_criteria?: Json | null
          updated_at?: string | null
          vendor_id?: string | null
          views_count?: number | null
        }
        Update: {
          ad_format?: string | null
          ad_placement?: string | null
          budget?: number | null
          clicks_count?: number | null
          created_at?: string | null
          daily_spend_limit?: number | null
          end_date?: string
          id?: string
          payment_amount?: number | null
          payment_method?: string | null
          payment_status?: string | null
          performance_metrics?: Json | null
          product_id?: string | null
          promotion_type?: string
          start_date?: string
          status?: string | null
          target_audience?: string | null
          targeting_criteria?: Json | null
          updated_at?: string | null
          vendor_id?: string | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_promotions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_promotions_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
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
          id?: string
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
