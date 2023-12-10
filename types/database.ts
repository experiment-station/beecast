export type Json =
  | { [key: string]: Json | undefined }
  | Json[]
  | boolean
  | null
  | number
  | string;

export type Database = {
  public: {
    CompositeTypes: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Tables: {
      account: {
        Insert: {
          ai_credit?: null | number;
          avatar_url?: null | string;
          created_at?: string;
          display_name?: null | string;
          id?: number;
          provider_refresh_token?: null | string;
          provider_token: string;
          user: string;
        };
        Relationships: [
          {
            columns: ['user'];
            foreignKeyName: 'account_user_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'users';
          },
        ];
        Row: {
          ai_credit: null | number;
          avatar_url: null | string;
          created_at: string;
          display_name: null | string;
          id: number;
          provider_refresh_token: null | string;
          provider_token: string;
          user: string;
        };
        Update: {
          ai_credit?: null | number;
          avatar_url?: null | string;
          created_at?: string;
          display_name?: null | string;
          id?: number;
          provider_refresh_token?: null | string;
          provider_token?: string;
          user?: string;
        };
      };
      account_show_relation: {
        Insert: {
          account: number;
          created_at?: string;
          id?: number;
          show: number;
        };
        Relationships: [
          {
            columns: ['account'];
            foreignKeyName: 'account_show_relation_account_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'account';
          },
          {
            columns: ['show'];
            foreignKeyName: 'account_show_relation_show_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'show';
          },
        ];
        Row: {
          account: number;
          created_at: string;
          id: number;
          show: number;
        };
        Update: {
          account?: number;
          created_at?: string;
          id?: number;
          show?: number;
        };
      };
      episode: {
        Insert: {
          audio_url: string;
          created_at?: string;
          description?: null | string;
          duration: number;
          episode_number: number;
          id?: number;
          images?: null | string[];
          podcast_index_guid: string;
          show: number;
          size?: null | number;
          title: string;
        };
        Relationships: [
          {
            columns: ['show'];
            foreignKeyName: 'episode_show_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'show';
          },
        ];
        Row: {
          audio_url: string;
          created_at: string;
          description: null | string;
          duration: number;
          episode_number: number;
          id: number;
          images: null | string[];
          podcast_index_guid: string;
          show: number;
          size: null | number;
          title: string;
        };
        Update: {
          audio_url?: string;
          created_at?: string;
          description?: null | string;
          duration?: number;
          episode_number?: number;
          id?: number;
          images?: null | string[];
          podcast_index_guid?: string;
          show?: number;
          size?: null | number;
          title?: string;
        };
      };
      episode_content: {
        Insert: {
          created_at?: string;
          episode: number;
          id?: number;
          text_summary?: null | string;
          transcription?: null | string;
          user: number;
        };
        Relationships: [
          {
            columns: ['episode'];
            foreignKeyName: 'episode_content_episode_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'episode';
          },
          {
            columns: ['user'];
            foreignKeyName: 'episode_content_user_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'account';
          },
        ];
        Row: {
          created_at: string;
          episode: number;
          id: number;
          text_summary: null | string;
          transcription: null | string;
          user: number;
        };
        Update: {
          created_at?: string;
          episode?: number;
          id?: number;
          text_summary?: null | string;
          transcription?: null | string;
          user?: number;
        };
      };
      episode_progress: {
        Insert: {
          at: number;
          created_at?: string;
          episode: number;
          finished?: boolean;
          id?: number;
          user: number;
        };
        Relationships: [
          {
            columns: ['episode'];
            foreignKeyName: 'episode_progress_episode_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'episode';
          },
          {
            columns: ['user'];
            foreignKeyName: 'episode_progress_user_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'account';
          },
        ];
        Row: {
          at: number;
          created_at: string;
          episode: number;
          finished: boolean;
          id: number;
          user: number;
        };
        Update: {
          at?: number;
          created_at?: string;
          episode?: number;
          finished?: boolean;
          id?: number;
          user?: number;
        };
      };
      show: {
        Insert: {
          created_at?: string;
          description?: null | string;
          id?: number;
          images?: null | string[];
          language?: null | string;
          podcast_index_guid: string;
          publisher: string;
          spotify_id: string;
          title: string;
          total_episode?: null | number;
        };
        Relationships: [];
        Row: {
          created_at: string;
          description: null | string;
          id: number;
          images: null | string[];
          language: null | string;
          podcast_index_guid: string;
          publisher: string;
          spotify_id: string;
          title: string;
          total_episode: null | number;
        };
        Update: {
          created_at?: string;
          description?: null | string;
          id?: number;
          images?: null | string[];
          language?: null | string;
          podcast_index_guid?: string;
          publisher?: string;
          spotify_id?: string;
          title?: string;
          total_episode?: null | number;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | { schema: keyof Database }
    | keyof (Database['public']['Tables'] & Database['public']['Views']),
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
    | { schema: keyof Database }
    | keyof Database['public']['Tables'],
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
    | { schema: keyof Database }
    | keyof Database['public']['Tables'],
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
    | { schema: keyof Database }
    | keyof Database['public']['Enums'],
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never;
