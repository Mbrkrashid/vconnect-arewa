import { Json } from './common'

export interface SupportTables {
  support_tickets: {
    Row: {
      id: string
      customer_id: string | null
      subject: string
      description: string
      status: string | null
      priority: string | null
      assigned_to: string | null
      created_at: string | null
      updated_at: string | null
    }
    Insert: {
      id?: string
      customer_id?: string | null
      subject: string
      description: string
      status?: string | null
      priority?: string | null
      assigned_to?: string | null
      created_at?: string | null
      updated_at?: string | null
    }
    Update: {
      id?: string
      customer_id?: string | null
      subject?: string
      description?: string
      status?: string | null
      priority?: string | null
      assigned_to?: string | null
      created_at?: string | null
      updated_at?: string | null
    }
    Relationships: []
  }
}