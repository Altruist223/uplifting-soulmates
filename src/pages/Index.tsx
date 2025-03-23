
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Wind, BarChart2, BookOpen, Info } from 'lucide-react';
import Header from '@/components/Header';
import Affirmation from '@/components/Affirmation';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featureItems = [
    {
      icon: <Wind className="w-5 h-5" />,
      title: 'Guided Breathing',
      description: 'Simple breathing exercises to help calm your mind and reduce anxiety.',
      link: '/breathe'
    },
    {
      icon: <BarChart2 className="w-5 h-5" />,
      title: 'Mood Tracking',
      description: 'Track your moods to identify patterns and gain insights.',
      link: '/mood'
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: 'Journaling',
      description: 'Express your thoughts and feelings in a safe, private space.',
      link: '/journal'
    },
    {
      icon: <Info className="w-5 h-5" />,
      title: 'Resources',
      description: 'Access helpful resources and professional support options.',
      link: '/resources'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 leading-tight">
                Your journey to <span className="text-primary font-normal">mental well-being</span> starts here
              </h1>
              
              <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-2xl mx-auto">
                Simple tools to help you track your mood, practice mindfulness, and connect with resources when you need them most.
              </p>
              
              <Link 
                to="/breathe" 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>
        
        {/* Affirmation Section */}
        <motion.section 
          className="py-12 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Affirmation />
        </motion.section>
        
        {/* Features Section */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-light text-center mb-12">
              Tools to support your mental health journey
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featureItems.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
                >
                  <Link to={feature.link} className="block">
                    <div className="glass-card p-6 h-full hover-lift">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                      <p className="text-foreground/70 mb-4">{feature.description}</p>
                      <div className="flex items-center gap-1 text-primary">
                        <span className="text-sm">Explore</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Support Message */}
        <section className="py-16 px-6 bg-primary/5">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-light mb-6">
              You're not alone in this journey
            </h2>
            <p className="text-lg text-foreground/70 mb-8">
              Depression and anxiety are common experiences. Seeking help and using tools 
              for self-care are signs of strength, not weakness.
            </p>
            <Link 
              to="/resources" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
            >
              Find Support <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <Link to="/" className="text-primary font-semibold text-lg tracking-tight flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary">S</span>
              </div>
              <span className="text-foreground">Serenity</span>
            </Link>
            <p className="text-sm text-foreground/60 mt-1">
              A companion for your mental well-being
            </p>
          </div>
          
          <div className="text-sm text-foreground/60">
            &copy; {new Date().getFullYear()} Serenity. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
