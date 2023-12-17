export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      account: {
        Row: {
          ai_credit: number;
          avatar_url: string | null;
          created_at: string;
          id: number;
          name: string;
          provider_refresh_token: string | null;
          provider_token: string;
          user_id: string;
        };
        Insert: {
          ai_credit?: number;
          avatar_url?: string | null;
          created_at?: string;
          id?: number;
          name: string;
          provider_refresh_token?: string | null;
          provider_token: string;
          user_id: string;
        };
        Update: {
          ai_credit?: number;
          avatar_url?: string | null;
          created_at?: string;
          id?: number;
          name?: string;
          provider_refresh_token?: string | null;
          provider_token?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'account_user_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'account_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      account_show_relation: {
        Row: {
          account: number;
          created_at: string;
          id: number;
          show: number;
        };
        Insert: {
          account: number;
          created_at?: string;
          id?: number;
          show: number;
        };
        Update: {
          account?: number;
          created_at?: string;
          id?: number;
          show?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'account_show_relation_account_fkey';
            columns: ['account'];
            isOneToOne: false;
            referencedRelation: 'account';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'account_show_relation_show_fkey';
            columns: ['show'];
            isOneToOne: false;
            referencedRelation: 'show';
            referencedColumns: ['id'];
          },
        ];
      };
      episode: {
        Row: {
          audio_url: string;
          created_at: string;
          description: string | null;
          duration: number;
          episode_number: number | null;
          id: number;
          image: string | null;
          podcast_index_guid: string;
          published_date: number | null;
          published_date_pretty: string | null;
          show: number;
          size: number | null;
          title: string;
        };
        Insert: {
          audio_url: string;
          created_at?: string;
          description?: string | null;
          duration: number;
          episode_number?: number | null;
          id?: number;
          image?: string | null;
          podcast_index_guid: string;
          published_date?: number | null;
          published_date_pretty?: string | null;
          show: number;
          size?: number | null;
          title: string;
        };
        Update: {
          audio_url?: string;
          created_at?: string;
          description?: string | null;
          duration?: number;
          episode_number?: number | null;
          id?: number;
          image?: string | null;
          podcast_index_guid?: string;
          published_date?: number | null;
          published_date_pretty?: string | null;
          show?: number;
          size?: number | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'episode_show_fkey';
            columns: ['show'];
            isOneToOne: false;
            referencedRelation: 'show';
            referencedColumns: ['id'];
          },
        ];
      };
      episode_content: {
        Row: {
          account: number;
          created_at: string;
          episode: number;
          id: number;
          text_summary: string | null;
          transcription: string | null;
        };
        Insert: {
          account: number;
          created_at?: string;
          episode: number;
          id?: number;
          text_summary?: string | null;
          transcription?: string | null;
        };
        Update: {
          account?: number;
          created_at?: string;
          episode?: number;
          id?: number;
          text_summary?: string | null;
          transcription?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'episode_content_account_fkey';
            columns: ['account'];
            isOneToOne: false;
            referencedRelation: 'account';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'episode_content_episode_fkey';
            columns: ['episode'];
            isOneToOne: true;
            referencedRelation: 'episode';
            referencedColumns: ['id'];
          },
        ];
      };
      episode_progress: {
        Row: {
          account: number;
          at: number;
          created_at: string;
          episode: number;
          finished: boolean;
          id: number;
        };
        Insert: {
          account: number;
          at: number;
          created_at?: string;
          episode: number;
          finished?: boolean;
          id?: number;
        };
        Update: {
          account?: number;
          at?: number;
          created_at?: string;
          episode?: number;
          finished?: boolean;
          id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'episode_progress_account_fkey';
            columns: ['account'];
            isOneToOne: false;
            referencedRelation: 'account';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'episode_progress_episode_fkey';
            columns: ['episode'];
            isOneToOne: false;
            referencedRelation: 'episode';
            referencedColumns: ['id'];
          },
        ];
      };
      imported_show: {
        Row: {
          created_at: string;
          id: number;
          podcast_index_guid: string;
          show: number;
          spotify_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          podcast_index_guid: string;
          show: number;
          spotify_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          podcast_index_guid?: string;
          show?: number;
          spotify_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'imported_show_show_fkey';
            columns: ['show'];
            isOneToOne: false;
            referencedRelation: 'show';
            referencedColumns: ['id'];
          },
        ];
      };
      order: {
        Row: {
          account: number;
          amount: number;
          created_at: string;
          credits: number;
          currency: string;
          id: number;
          invoice_url: string;
          reference_id: string;
          status: string;
        };
        Insert: {
          account: number;
          amount: number;
          created_at?: string;
          credits: number;
          currency: string;
          id?: number;
          invoice_url?: string;
          reference_id: string;
          status: string;
        };
        Update: {
          account?: number;
          amount?: number;
          created_at?: string;
          credits?: number;
          currency?: string;
          id?: number;
          invoice_url?: string;
          reference_id?: string;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'order_account_fkey';
            columns: ['account'];
            isOneToOne: false;
            referencedRelation: 'account';
            referencedColumns: ['id'];
          },
        ];
      };
      show: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          images: string[] | null;
          language: string | null;
          podcast_index_guid: string;
          publisher: string;
          spotify_id: string | null;
          title: string;
          total_episode: number | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          images?: string[] | null;
          language?: string | null;
          podcast_index_guid: string;
          publisher: string;
          spotify_id?: string | null;
          title: string;
          total_episode?: number | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          images?: string[] | null;
          language?: string | null;
          podcast_index_guid?: string;
          publisher?: string;
          spotify_id?: string | null;
          title?: string;
          total_episode?: number | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
        Database['public']['Views'])
    ? (Database['public']['Tables'] &
        Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never;
