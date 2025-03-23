
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Header from '@/components/Header';
import BreathingExercise from '@/components/BreathingExercise';

const Breathe = () => {
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
          
          <h1 className="text-3xl md:text-4xl font-light mb-4">Breathing Exercises</h1>
          <p className="text-foreground/70 mb-8">
            Deep breathing is a simple yet powerful technique to reduce stress and anxiety.
            Take a few minutes to focus on your breath and reset your mind.
          </p>
          
          <div className="glass-card p-8 mb-10">
            <BreathingExercise />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="glass-card p-6">
              <h3 className="text-lg font-medium mb-3">Why Breathing Helps</h3>
              <p className="text-foreground/70">
                Deep breathing activates your parasympathetic nervous system, which helps 
                counteract the stress response. It reduces heart rate, lowers blood pressure, 
                and brings a sense of calm to your mind and body.
              </p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-lg font-medium mb-3">How to Practice</h3>
              <p className="text-foreground/70">
                Find a quiet place where you won't be disturbed. Sit or lie down comfortably.
                Follow the guided animation, focusing your attention on your breath.
                Try to practice for 5-10 minutes daily for best results.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Breathe;
