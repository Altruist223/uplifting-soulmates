
import { createClient } from '@supabase/supabase-js';

// Import the proper Supabase client configuration
import { supabase as supabaseClient } from '@/integrations/supabase/client';

// Export the configured client
export const supabase = supabaseClient;

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
