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
      bel_loans: {
        Row: {
          created_at: string
          id: string
          maandelijkse_aflossing: number
          openstaand_bedrag: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          maandelijkse_aflossing?: number
          openstaand_bedrag?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          maandelijkse_aflossing?: number
          openstaand_bedrag?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      cashflow_history: {
        Row: {
          amount: number
          changed_at: string
          changed_by: string | null
          id: string
          note: string | null
          previous_amount: number
          user_id: string
        }
        Insert: {
          amount: number
          changed_at?: string
          changed_by?: string | null
          id?: string
          note?: string | null
          previous_amount: number
          user_id: string
        }
        Update: {
          amount?: number
          changed_at?: string
          changed_by?: string | null
          id?: string
          note?: string | null
          previous_amount?: number
          user_id?: string
        }
        Relationships: []
      }
      cashflows: {
        Row: {
          cashflow_bedrag: number
          created_at: string
          id: string
          maand: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cashflow_bedrag?: number
          created_at?: string
          id?: string
          maand: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cashflow_bedrag?: number
          created_at?: string
          id?: string
          maand?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      flowlutas: {
        Row: {
          activated_at: string
          created_at: string
          id: string
          monthly_cashflow: number
          next_activation_date: string | null
          status: Database["public"]["Enums"]["flowluta_status"]
          tier: number
          updated_at: string
          user_id: string
        }
        Insert: {
          activated_at?: string
          created_at?: string
          id?: string
          monthly_cashflow?: number
          next_activation_date?: string | null
          status?: Database["public"]["Enums"]["flowluta_status"]
          tier?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          activated_at?: string
          created_at?: string
          id?: string
          monthly_cashflow?: number
          next_activation_date?: string | null
          status?: Database["public"]["Enums"]["flowluta_status"]
          tier?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notification_templates: {
        Row: {
          content: string
          created_at: string
          id: string
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          bericht: string
          created_at: string
          gelezen: boolean
          id: string
          type: Database["public"]["Enums"]["notification_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          bericht: string
          created_at?: string
          gelezen?: boolean
          id?: string
          type?: Database["public"]["Enums"]["notification_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          bericht?: string
          created_at?: string
          gelezen?: boolean
          id?: string
          type?: Database["public"]["Enums"]["notification_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          achternaam: string | null
          created_at: string
          email: string | null
          id: string
          telefoonnummer: string | null
          updated_at: string
          voornaam: string | null
        }
        Insert: {
          achternaam?: string | null
          created_at?: string
          email?: string | null
          id: string
          telefoonnummer?: string | null
          updated_at?: string
          voornaam?: string | null
        }
        Update: {
          achternaam?: string | null
          created_at?: string
          email?: string | null
          id?: string
          telefoonnummer?: string | null
          updated_at?: string
          voornaam?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string
          id: string
          referral_code: string
          referred_user_id: string | null
          status: Database["public"]["Enums"]["referral_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          referral_code: string
          referred_user_id?: string | null
          status?: Database["public"]["Enums"]["referral_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          referral_code?: string
          referred_user_id?: string | null
          status?: Database["public"]["Enums"]["referral_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      registration_leads: {
        Row: {
          answers: Json
          created_at: string
          general: Json
          id: string
          role: string
          status: string
          updated_at: string
        }
        Insert: {
          answers: Json
          created_at?: string
          general: Json
          id?: string
          role: string
          status?: string
          updated_at?: string
        }
        Update: {
          answers?: Json
          created_at?: string
          general?: Json
          id?: string
          role?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      scheduled_notifications: {
        Row: {
          content: string
          created_at: string
          id: string
          is_group_notification: boolean | null
          recipient_id: string | null
          scheduled_for: string
          status: string
          title: string
          type: Database["public"]["Enums"]["notification_type"]
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_group_notification?: boolean | null
          recipient_id?: string | null
          scheduled_for: string
          status?: string
          title: string
          type: Database["public"]["Enums"]["notification_type"]
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_group_notification?: boolean | null
          recipient_id?: string | null
          scheduled_for?: string
          status?: string
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
        }
        Relationships: []
      }
      spirits: {
        Row: {
          activated_at: string
          created_at: string
          id: string
          monthly_cashflow: number
          next_activation_date: string | null
          status: Database["public"]["Enums"]["spirit_status"]
          tier: number
          updated_at: string
          user_id: string
        }
        Insert: {
          activated_at?: string
          created_at?: string
          id?: string
          monthly_cashflow?: number
          next_activation_date?: string | null
          status?: Database["public"]["Enums"]["spirit_status"]
          tier?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          activated_at?: string
          created_at?: string
          id?: string
          monthly_cashflow?: number
          next_activation_date?: string | null
          status?: Database["public"]["Enums"]["spirit_status"]
          tier?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          created_at: string
          deadline: string | null
          id: string
          priority: string
          status: Database["public"]["Enums"]["task_status"]
          taak_omschrijving: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          deadline?: string | null
          id?: string
          priority?: string
          status?: Database["public"]["Enums"]["task_status"]
          taak_omschrijving: string
          type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          deadline?: string | null
          id?: string
          priority?: string
          status?: Database["public"]["Enums"]["task_status"]
          taak_omschrijving?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_flowluta_activation_allowed: {
        Args: { user_id: string }
        Returns: boolean
      }
      check_spirit_activation_allowed: {
        Args: { user_id: string }
        Returns: boolean
      }
      create_admin_user: {
        Args: { email: string; password: string }
        Returns: string
      }
      get_total_value: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_user_role: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      flowluta_status: "planned" | "active" | "paused"
      notification_type: "taak" | "flowluta" | "system" | "lead"
      referral_status: "pending" | "successful"
      spirit_status: "planned" | "active" | "paused"
      task_status: "open" | "in_progress" | "completed"
      user_role: "guest" | "member" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      flowluta_status: ["planned", "active", "paused"],
      notification_type: ["taak", "flowluta", "system", "lead"],
      referral_status: ["pending", "successful"],
      spirit_status: ["planned", "active", "paused"],
      task_status: ["open", "in_progress", "completed"],
      user_role: ["guest", "member", "admin"],
    },
  },
} as const
