
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, JournalEntry, mapDbJournalEntry } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const JournalDataView = () => {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchJournalEntries = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('journal_entries')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        setJournalEntries(data ? data.map(mapDbJournalEntry) : []);
      } catch (error: any) {
        toast({
          title: 'Error fetching journal entries',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchJournalEntries();
  }, [user, toast]);

  if (loading) {
    return <div className="text-center py-8">Loading your journal entries...</div>;
  }

  if (journalEntries.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-lg">
        <div className="mb-4 text-foreground/70">You haven't written any journal entries yet</div>
        <p className="mb-4 text-sm text-foreground/60 max-w-md mx-auto">
          Journaling helps process emotions and gain clarity. Start writing to build your wellness practice.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {journalEntries.map((entry) => (
        <Card key={entry.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Journal Entry</CardTitle>
              <div className="text-xs text-foreground/60 flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {entry.created_at && format(new Date(entry.created_at), 'MMM d, yyyy')}
              </div>
            </div>
            {entry.prompt && (
              <CardDescription>
                Prompt: {entry.prompt}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{entry.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JournalDataView;
