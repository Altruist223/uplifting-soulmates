
import { createClient } from '@supabase/supabase-js';

// Import the proper Supabase client configuration
import { supabase as supabaseClient } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

// Export the configured client
export const supabase = supabaseClient;

// Types for our database tables - manually defined for strict typing
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

// Helper functions to convert database types to application types
export const mapDbMoodEntry = (data: Database['public']['Tables']['mood_entries']['Row']): MoodEntry => ({
  id: data.id,
  user_id: data.user_id,
  created_at: data.created_at,
  mood: data.mood as 'great' | 'good' | 'okay' | 'low' | 'bad',
  triggers: data.triggers || [],
  notes: data.notes,
  weather: data.weather
});

export const mapDbJournalEntry = (data: Database['public']['Tables']['journal_entries']['Row']): JournalEntry => ({
  id: data.id,
  user_id: data.user_id,
  created_at: data.created_at,
  content: data.content,
  prompt: data.prompt
});

export const mapDbQuizResult = (data: Database['public']['Tables']['quiz_results']['Row']): QuizResult => ({
  id: data.id,
  user_id: data.user_id,
  created_at: data.created_at,
  score: data.score,
  level: data.level,
  recommendations: data.recommendations || []
});
