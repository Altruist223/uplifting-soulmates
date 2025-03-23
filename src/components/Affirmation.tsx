
import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const affirmations = [
  "You are stronger than you know.",
  "This feeling is temporary. It will pass.",
  "Small steps still move you forward.",
  "You deserve kindness, especially from yourself.",
  "Your existence matters more than you realize.",
  "It's okay to rest and recover.",
  "You are not defined by your struggles.",
  "This moment is not your forever.",
  "Your feelings are valid, but they are not facts.",
  "Healing isn't linear, and that's okay.",
  "You've survived difficult days before.",
  "You are worthy of peace and happiness.",
  "Your presence in this world makes a difference."
];

const Affirmation = () => {
  const [affirmation, setAffirmation] = useState("");
  const [isChanging, setIsChanging] = useState(false);
  
  useEffect(() => {
    getRandomAffirmation();
    
    // Change affirmation every 15 seconds
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        getRandomAffirmation();
        setIsChanging(false);
      }, 500);
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);
  
  const getRandomAffirmation = () => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setAffirmation(affirmations[randomIndex]);
  };
  
  return (
    <div className="max-w-md mx-auto glass-card px-8 py-10 relative overflow-hidden">
      <div className="absolute top-3 right-3">
        <Sparkles className="text-primary/60 w-5 h-5 animate-pulse-soft" />
      </div>
      
      <h3 className="text-sm uppercase tracking-wider text-primary/70 font-medium mb-4">
        Today's Affirmation
      </h3>
      
      <blockquote 
        className={`text-2xl font-light text-center leading-relaxed transition-opacity duration-500 ${
          isChanging ? 'opacity-0' : 'opacity-100'
        }`}
      >
        "{affirmation}"
      </blockquote>
      
      <button 
        onClick={() => {
          setIsChanging(true);
          setTimeout(() => {
            getRandomAffirmation();
            setIsChanging(false);
          }, 500);
        }}
        className="mt-6 mx-auto block text-sm text-primary hover:text-primary/80 
          transition-colors duration-200 focus:outline-none"
      >
        New affirmation
      </button>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-14 -left-14 w-28 h-28 rounded-full bg-primary/5 blur-2xl"></div>
      <div className="absolute -top-14 -right-14 w-28 h-28 rounded-full bg-accent/5 blur-2xl"></div>
    </div>
  );
};

export default Affirmation;
