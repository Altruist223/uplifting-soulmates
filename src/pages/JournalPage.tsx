
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Header from '@/components/Header';
import Journal from '@/components/Journal';

const JournalPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center text-foreground/70 hover:text-foreground mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-light mb-4">Journal</h1>
          <p className="text-foreground/70 mb-8">
            Journaling can help you process emotions, gain clarity, and reduce stress.
            Write freely without worrying about grammar or structure.
          </p>
          
          <div className="glass-card p-6 mb-12">
            <Journal />
          </div>
          
          <div className="mt-12">
            <h2 className="text-xl font-medium mb-4">Benefits of Journaling</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-card p-5">
                <h3 className="text-primary font-medium mb-2">Emotional Processing</h3>
                <p className="text-sm text-foreground/70">
                  Writing helps you identify and work through complex emotions in a safe, private space.
                </p>
              </div>
              
              <div className="glass-card p-5">
                <h3 className="text-primary font-medium mb-2">Clarity & Insight</h3>
                <p className="text-sm text-foreground/70">
                  Putting thoughts on paper can help you see situations more objectively and discover new perspectives.
                </p>
              </div>
              
              <div className="glass-card p-5">
                <h3 className="text-primary font-medium mb-2">Stress Reduction</h3>
                <p className="text-sm text-foreground/70">
                  The act of writing can lower anxiety levels and help clear a busy mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JournalPage;
