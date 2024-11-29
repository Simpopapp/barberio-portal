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
      appointments: {
        Row: {
          appointment_date: string
          created_at: string
          id: string
          service_id: string
          status: string | null
          user_id: string
        }
        Insert: {
          appointment_date: string
          created_at?: string
          id?: string
          service_id: string
          status?: string | null
          user_id: string
        }
        Update: {
          appointment_date?: string
          created_at?: string
          id?: string
          service_id?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      artifacts: {
        Row: {
          created_at: string
          created_by: string | null
          effect: Database["public"]["Enums"]["artifact_effect"]
          elements: Json
          id: string
          name: string
          power_level: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          effect: Database["public"]["Enums"]["artifact_effect"]
          elements: Json
          id?: string
          name: string
          power_level?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          effect?: Database["public"]["Enums"]["artifact_effect"]
          elements?: Json
          id?: string
          name?: string
          power_level?: number
          updated_at?: string
        }
        Relationships: []
      }
      business_hours: {
        Row: {
          close_time: string
          day_of_week: number | null
          id: string
          is_closed: boolean | null
          open_time: string
        }
        Insert: {
          close_time: string
          day_of_week?: number | null
          id?: string
          is_closed?: boolean | null
          open_time: string
        }
        Update: {
          close_time?: string
          day_of_week?: number | null
          id?: string
          is_closed?: boolean | null
          open_time?: string
        }
        Relationships: []
      }
      categorias: {
        Row: {
          icone: string | null
          id: string
          nome: string
        }
        Insert: {
          icone?: string | null
          id?: string
          nome: string
        }
        Update: {
          icone?: string | null
          id?: string
          nome?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          name?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string | null
          duration: unknown
          id: string
          name: string
          price: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration: unknown
          id?: string
          name: string
          price: number
        }
        Update: {
          created_at?: string
          description?: string | null
          duration?: unknown
          id?: string
          name?: string
          price?: number
        }
        Relationships: []
      }
      story_progress: {
        Row: {
          chapter: number
          choices: Json
          current_scene: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          chapter?: number
          choices?: Json
          current_scene: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          chapter?: number
          choices?: Json
          current_scene?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tarefas: {
        Row: {
          categoria_id: string | null
          id: string
          nome: string
          notas: string | null
          status: string | null
          tempo_gasto: number | null
          tempo_restante: number | null
        }
        Insert: {
          categoria_id?: string | null
          id?: string
          nome: string
          notas?: string | null
          status?: string | null
          tempo_gasto?: number | null
          tempo_restante?: number | null
        }
        Update: {
          categoria_id?: string | null
          id?: string
          nome?: string
          notas?: string | null
          status?: string | null
          tempo_gasto?: number | null
          tempo_restante?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tarefas_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          completed_at: string | null
          created_at: string
          description: string | null
          id: string
          priority: string
          status: string
          time_spent: number | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          id?: string
          priority?: string
          status?: string
          time_spent?: number | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          id?: string
          priority?: string
          status?: string
          time_spent?: number | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone: string | null
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
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
      artifact_effect: "damage" | "healing" | "protection" | "transformation"
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
