export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: '14.18'
  }
  public: {
    Tables: {
      contributions: {
        Row: {
          amount_inr: number
          contributed_on: string
          contributor_name: string
          created_at: string
          id: string
          unit_id: string
        }
        Insert: {
          amount_inr: number
          contributed_on: string
          contributor_name: string
          created_at?: string
          id?: string
          unit_id: string
        }
        Update: {
          amount_inr?: number
          contributed_on?: string
          contributor_name?: string
          created_at?: string
          id?: string
          unit_id?: string
        }
        Relationships: []
      }
      festival_settings: {
        Row: {
          id: number
          target_inr: number
          updated_at: string
        }
        Insert: {
          id?: number
          target_inr?: number
          updated_at?: string
        }
        Update: {
          id?: number
          target_inr?: number
          updated_at?: string
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
