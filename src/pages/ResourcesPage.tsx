
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Header from '@/components/Header';
import Resources from '@/components/Resources';

const ResourcesPage = () => {
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
          
          <h1 className="text-3xl md:text-4xl font-light mb-4">Support Resources</h1>
          <p className="text-foreground/70 mb-8">
            Everyone needs help sometimes. These resources provide support, information, and 
            professional assistance for mental health concerns.
          </p>
          
          <div className="glass-card p-6 mb-12">
            <Resources />
          </div>
          
          <div className="glass-card p-6 mt-10">
            <h2 className="text-xl font-medium mb-4">When to Seek Help</h2>
            <p className="text-foreground/70 mb-4">
              While self-help tools can be valuable, it's important to recognize when professional support is needed.
              Consider reaching out if you experience:
            </p>
            <ul className="space-y-2 text-foreground/70">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                <span>Persistent feelings of sadness or hopelessness that don't improve</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                <span>Difficulty with daily activities, work, or relationships</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                <span>Changes in sleep, appetite, or energy levels</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                <span>Thoughts of harming yourself or others</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                <span>Using substances to cope with difficult emotions</span>
              </li>
            </ul>
            <p className="mt-4 text-foreground/70">
              Remember: Seeking help is a sign of strength, not weakness. Everyone deserves support.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResourcesPage;
