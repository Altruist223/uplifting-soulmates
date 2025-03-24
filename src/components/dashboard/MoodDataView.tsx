
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, MoodEntry, mapDbMoodEntry } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MoodDataView = () => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchMoodEntries = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('mood_entries')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        setMoodEntries(data ? data.map(mapDbMoodEntry) : []);
      } catch (error: any) {
        toast({
          title: 'Error fetching mood entries',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchMoodEntries();
  }, [user, toast]);

  if (loading) {
    return <div className="text-center py-8">Loading your mood data...</div>;
  }

  if (moodEntries.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-lg">
        <div className="mb-4 text-foreground/70">You haven't tracked any moods yet</div>
        <p className="mb-4 text-sm text-foreground/60 max-w-md mx-auto">
          Start tracking your daily moods to see patterns and insights about your emotional wellbeing.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {moodEntries.map((entry) => (
          <Card key={entry.id} className="overflow-hidden">
            <CardHeader className={`pb-2 ${getMoodColor(entry.mood)}`}>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg capitalize">{entry.mood}</CardTitle>
                <div className="text-xs text-foreground/60 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {entry.created_at && format(new Date(entry.created_at), 'MMM d, yyyy')}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              {entry.triggers && entry.triggers.length > 0 && (
                <div className="mb-2">
                  <span className="text-xs text-foreground/60 block mb-1">Factors:</span>
                  <div className="flex flex-wrap gap-1">
                    {entry.triggers.map((trigger, i) => (
                      <span 
                        key={i} 
                        className="text-xs bg-primary/10 text-primary py-0.5 px-2 rounded-full"
                      >
                        {trigger}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {entry.notes && (
                <div>
                  <span className="text-xs text-foreground/60 block mb-1">Notes:</span>
                  <p className="text-sm">{entry.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const getMoodColor = (mood: string) => {
  switch (mood) {
    case 'great':
      return 'bg-green-100 dark:bg-green-900/20';
    case 'good':
      return 'bg-blue-100 dark:bg-blue-900/20';
    case 'okay':
      return 'bg-yellow-100 dark:bg-yellow-900/20';
    case 'low':
      return 'bg-orange-100 dark:bg-orange-900/20';
    case 'bad':
      return 'bg-red-100 dark:bg-red-900/20';
    default:
      return 'bg-muted';
  }
};

export default MoodDataView;
