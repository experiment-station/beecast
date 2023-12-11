import { Database as DatabaseGenerated } from './database-generated';

export type Database = DatabaseGenerated;

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
