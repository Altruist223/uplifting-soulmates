
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase, MoodEntry, JournalEntry, QuizResult } from '@/lib/supabase';
import { ChevronLeft, LogOut, Calendar, BarChart, Book, ActivitySquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

const Profile = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Fetch mood entries
        const { data: moodData, error: moodError } = await supabase
          .from('mood_entries')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (moodError) throw moodError;
        setMoodEntries(moodData || []);
        
        // Fetch journal entries
        const { data: journalData, error: journalError } = await supabase
          .from('journal_entries')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (journalError) throw journalError;
        setJournalEntries(journalData || []);
        
        // Fetch quiz results
        const { data: quizData, error: quizError } = await supabase
          .from('quiz_results')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (quizError) throw quizError;
        setQuizResults(quizData || []);
        
      } catch (error: any) {
        toast({
          title: 'Error fetching data',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user, navigate, toast]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: 'Signed out successfully',
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Error signing out',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-foreground/70 hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Home
            </Link>
            
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </Button>
          </div>
          
          <div className="mb-8">
            <h1 className="text-3xl font-light mb-2">Your Wellness Profile</h1>
            <p className="text-foreground/70">
              View and manage your wellness journey data
            </p>
          </div>

          <Tabs defaultValue="mood">
            <TabsList className="mb-6">
              <TabsTrigger value="mood" className="gap-2">
                <ActivitySquare className="w-4 h-4" />
                Mood Tracker
              </TabsTrigger>
              <TabsTrigger value="journal" className="gap-2">
                <Book className="w-4 h-4" />
                Journal
              </TabsTrigger>
              <TabsTrigger value="quiz" className="gap-2">
                <BarChart className="w-4 h-4" />
                Wellness Quiz
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="mood">
              <h2 className="text-xl font-medium mb-4">Your Mood History</h2>
              
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : moodEntries.length === 0 ? (
                <div className="text-center py-8 text-foreground/70">
                  <div className="mb-4">You haven't tracked any moods yet</div>
                  <Button asChild>
                    <Link to="/mood">Track your first mood</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {moodEntries.map((entry) => (
                    <Card key={entry.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg capitalize">{entry.mood}</CardTitle>
                          <div className="text-xs text-foreground/60 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {entry.created_at && format(new Date(entry.created_at), 'MMM d, yyyy')}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
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
              )}
            </TabsContent>
            
            <TabsContent value="journal">
              <h2 className="text-xl font-medium mb-4">Your Journal Entries</h2>
              
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : journalEntries.length === 0 ? (
                <div className="text-center py-8 text-foreground/70">
                  <div className="mb-4">You haven't written any journal entries yet</div>
                  <Button asChild>
                    <Link to="/journal">Write your first entry</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {journalEntries.map((entry) => (
                    <Card key={entry.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">
                            Journal Entry
                          </CardTitle>
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
              )}
            </TabsContent>
            
            <TabsContent value="quiz">
              <h2 className="text-xl font-medium mb-4">Your Wellness Quiz Results</h2>
              
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : quizResults.length === 0 ? (
                <div className="text-center py-8 text-foreground/70">
                  <div className="mb-4">You haven't taken any wellness quizzes yet</div>
                  <Button asChild>
                    <Link to="/wellness-quiz">Take the wellness quiz</Link>
                  </Button>
                </div>
              ) : (
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
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;
