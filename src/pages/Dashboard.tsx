
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ActivitySquare, Book, BarChart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import MoodDataView from '@/components/dashboard/MoodDataView';
import JournalDataView from '@/components/dashboard/JournalDataView';
import QuizDataView from '@/components/dashboard/QuizDataView';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('mood');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-light mb-2">Your Wellness Dashboard</h1>
            <p className="text-foreground/70">
              Welcome back, {user?.email}! Track your wellness journey and view your progress.
            </p>
          </div>

          <Tabs defaultValue="mood" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <TabsList>
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
              
              {activeTab === 'mood' && (
                <Button asChild size="sm">
                  <Link to="/mood">
                    <Plus className="w-4 h-4 mr-1" />
                    New Mood Entry
                  </Link>
                </Button>
              )}
              
              {activeTab === 'journal' && (
                <Button asChild size="sm">
                  <Link to="/journal">
                    <Plus className="w-4 h-4 mr-1" />
                    New Journal Entry
                  </Link>
                </Button>
              )}
              
              {activeTab === 'quiz' && (
                <Button asChild size="sm">
                  <Link to="/wellness-quiz">
                    <Plus className="w-4 h-4 mr-1" />
                    Take Quiz
                  </Link>
                </Button>
              )}
            </div>
            
            <TabsContent value="mood">
              <MoodDataView />
            </TabsContent>
            
            <TabsContent value="journal">
              <JournalDataView />
            </TabsContent>
            
            <TabsContent value="quiz">
              <QuizDataView />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
