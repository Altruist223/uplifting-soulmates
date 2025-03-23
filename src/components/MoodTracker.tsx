
import { useState } from 'react';
import { Smile, Meh, Frown, Wind, Sun, Cloud, CloudRain, Moon } from 'lucide-react';

type Mood = 'great' | 'good' | 'okay' | 'low' | 'bad';
type Trigger = 'work' | 'relationships' | 'health' | 'sleep' | 'other';
type Weather = 'sunny' | 'cloudy' | 'rainy' | 'windy' | 'night';

const MoodTracker = () => {
  const [mood, setMood] = useState<Mood | null>(null);
  const [triggers, setTriggers] = useState<Trigger[]>([]);
  const [notes, setNotes] = useState('');
  const [weather, setWeather] = useState<Weather | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleTriggerToggle = (trigger: Trigger) => {
    if (triggers.includes(trigger)) {
      setTriggers(triggers.filter(t => t !== trigger));
    } else {
      setTriggers([...triggers, trigger]);
    }
  };
  
  const handleSubmit = () => {
    if (!mood) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, we would save this data to a database
      console.log({
        date: new Date(),
        mood,
        triggers,
        notes,
        weather
      });
      
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Reset form after a delay
      setTimeout(() => {
        setMood(null);
        setTriggers([]);
        setNotes('');
        setWeather(null);
        setSubmitted(false);
      }, 3000);
    }, 1000);
  };
  
  if (submitted) {
    return (
      <div className="glass-card p-8 text-center max-w-md mx-auto animate-fade-in">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Smile className="text-primary w-8 h-8" />
        </div>
        <h3 className="text-xl font-medium mb-2">Entry Saved</h3>
        <p className="text-foreground/70">
          Thank you for tracking your mood. Regular tracking helps identify patterns and improve self-awareness.
        </p>
      </div>
    );
  }
  
  return (
    <div className="glass-card p-8 max-w-md mx-auto">
      <h3 className="text-xl font-medium mb-6 text-center">How are you feeling?</h3>
      
      {/* Mood selection */}
      <div className="flex justify-between mb-8">
        <MoodButton 
          label="Great" 
          icon={<Smile className="w-6 h-6" />} 
          selected={mood === 'great'} 
          onClick={() => setMood('great')} 
        />
        <MoodButton 
          label="Good" 
          icon={<Smile className="w-6 h-6" />} 
          selected={mood === 'good'} 
          onClick={() => setMood('good')} 
        />
        <MoodButton 
          label="Okay" 
          icon={<Meh className="w-6 h-6" />} 
          selected={mood === 'okay'} 
          onClick={() => setMood('okay')} 
        />
        <MoodButton 
          label="Low" 
          icon={<Frown className="w-6 h-6" />} 
          selected={mood === 'low'} 
          onClick={() => setMood('low')} 
        />
        <MoodButton 
          label="Bad" 
          icon={<Frown className="w-6 h-6" />} 
          selected={mood === 'bad'} 
          onClick={() => setMood('bad')} 
        />
      </div>
      
      {/* Weather selection */}
      <div className="mb-6">
        <h4 className="text-sm uppercase tracking-wider text-primary/70 font-medium mb-3">
          Weather
        </h4>
        <div className="flex justify-between">
          <WeatherButton 
            icon={<Sun className="w-5 h-5" />} 
            selected={weather === 'sunny'} 
            onClick={() => setWeather('sunny')} 
          />
          <WeatherButton 
            icon={<Cloud className="w-5 h-5" />} 
            selected={weather === 'cloudy'} 
            onClick={() => setWeather('cloudy')} 
          />
          <WeatherButton 
            icon={<CloudRain className="w-5 h-5" />} 
            selected={weather === 'rainy'} 
            onClick={() => setWeather('rainy')} 
          />
          <WeatherButton 
            icon={<Wind className="w-5 h-5" />} 
            selected={weather === 'windy'} 
            onClick={() => setWeather('windy')} 
          />
          <WeatherButton 
            icon={<Moon className="w-5 h-5" />} 
            selected={weather === 'night'} 
            onClick={() => setWeather('night')} 
          />
        </div>
      </div>
      
      {/* Triggers/factors */}
      <div className="mb-6">
        <h4 className="text-sm uppercase tracking-wider text-primary/70 font-medium mb-3">
          Contributing Factors
        </h4>
        <div className="flex flex-wrap gap-2">
          <TriggerButton 
            label="Work/School" 
            selected={triggers.includes('work')} 
            onClick={() => handleTriggerToggle('work')} 
          />
          <TriggerButton 
            label="Relationships" 
            selected={triggers.includes('relationships')} 
            onClick={() => handleTriggerToggle('relationships')} 
          />
          <TriggerButton 
            label="Health" 
            selected={triggers.includes('health')} 
            onClick={() => handleTriggerToggle('health')} 
          />
          <TriggerButton 
            label="Sleep" 
            selected={triggers.includes('sleep')} 
            onClick={() => handleTriggerToggle('sleep')} 
          />
          <TriggerButton 
            label="Other" 
            selected={triggers.includes('other')} 
            onClick={() => handleTriggerToggle('other')} 
          />
        </div>
      </div>
      
      {/* Notes */}
      <div className="mb-8">
        <label className="text-sm uppercase tracking-wider text-primary/70 font-medium mb-3 block">
          Notes (Optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-3 rounded-lg border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          placeholder="How are you feeling? What's on your mind?"
          rows={3}
        />
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={!mood || isSubmitting}
        className={`w-full py-3 rounded-lg font-medium text-white transition-all ${
          !mood || isSubmitting
            ? 'bg-primary/50 cursor-not-allowed'
            : 'bg-primary hover:bg-primary/90'
        }`}
      >
        {isSubmitting ? 'Saving...' : 'Save Entry'}
      </button>
    </div>
  );
};

const MoodButton = ({ 
  label, 
  icon, 
  selected, 
  onClick 
}: { 
  label: string; 
  icon: React.ReactNode; 
  selected: boolean; 
  onClick: () => void;
}) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center transition-all ${
      selected ? 'transform scale-110' : 'opacity-60 hover:opacity-80'
    }`}
  >
    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-1 transition-colors ${
      selected ? 'bg-primary/20 text-primary' : 'bg-secondary text-foreground/70'
    }`}>
      {icon}
    </div>
    <span className="text-xs">{label}</span>
  </button>
);

const WeatherButton = ({ 
  icon, 
  selected, 
  onClick 
}: { 
  icon: React.ReactNode; 
  selected: boolean; 
  onClick: () => void;
}) => (
  <button 
    onClick={onClick}
    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
      selected 
        ? 'bg-primary/20 text-primary transform scale-110' 
        : 'bg-secondary text-foreground/70 hover:opacity-80'
    }`}
  >
    {icon}
  </button>
);

const TriggerButton = ({ 
  label, 
  selected, 
  onClick 
}: { 
  label: string; 
  selected: boolean; 
  onClick: () => void;
}) => (
  <button 
    onClick={onClick}
    className={`px-3 py-1 rounded-full text-sm transition-all ${
      selected 
        ? 'bg-primary/20 text-primary' 
        : 'bg-secondary text-foreground/70 hover:bg-secondary/70'
    }`}
  >
    {label}
  </button>
);

export default MoodTracker;
