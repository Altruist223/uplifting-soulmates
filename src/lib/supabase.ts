
import { createClient } from '@supabase/supabase-js';

// These are public keys - safe to be in client code
const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export type MoodEntry = {
  id?: string;
  user_id?: string;
  created_at?: string;
  mood: 'great' | 'good' | 'okay' | 'low' | 'bad';
  triggers: string[];
  notes: string | null;
  weather: string | null;
};

export type JournalEntry = {
  id?: string;
  user_id?: string;
  created_at?: string;
  content: string;
  prompt: string | null;
};

export type QuizResult = {
  id?: string;
  user_id?: string;
  created_at?: string;
  score: number;
  level: string;
  recommendations: string[];
};
