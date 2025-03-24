
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, QuizResult, mapDbQuizResult } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const QuizDataView = () => {
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchQuizResults = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('quiz_results')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        setQuizResults(data ? data.map(mapDbQuizResult) : []);
      } catch (error: any) {
        toast({
          title: 'Error fetching quiz results',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuizResults();
  }, [user, toast]);

  if (loading) {
    return <div className="text-center py-8">Loading your quiz results...</div>;
  }

  if (quizResults.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-lg">
        <div className="mb-4 text-foreground/70">You haven't taken any wellness quizzes yet</div>
        <p className="mb-4 text-sm text-foreground/60 max-w-md mx-auto">
          Take the wellness quiz to receive personalized recommendations for your mental wellbeing.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {quizResults.map((result) => (
        <Card key={result.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">
                Wellness Level: {result.level}
              </CardTitle>
              <div className="text-xs text-foreground/60 flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {result.created_at && format(new Date(result.created_at), 'MMM d, yyyy')}
              </div>
            </div>
            <CardDescription>
              Score: {result.score}/24
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <h4 className="text-sm font-medium mb-2">Recommendations:</h4>
              <ul className="text-sm space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuizDataView;
