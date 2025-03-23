
import { useState } from 'react';
import { BookOpen, Star, AlertCircle, Save } from 'lucide-react';

const promptSuggestions = [
  "What's one small thing I'm grateful for today?",
  "How am I feeling right now, and why might I be feeling this way?",
  "What's one small victory I experienced today?",
  "If I could send a message to myself tomorrow, what would it say?",
  "What's something that made me smile today, no matter how small?",
  "What's one way I showed myself kindness today?",
  "What's something I'm looking forward to?",
  "If today had a color, what would it be and why?",
  "What's one thing I can let go of?",
  "What strength helped me today?"
];

const Journal = () => {
  const [entry, setEntry] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState('');
  
  const handleSave = () => {
    if (!entry.trim()) return;
    
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, we would save this entry to a database
      console.log({
        date: new Date(),
        content: entry,
        prompt: selectedPrompt || null
      });
      
      setIsSaving(false);
      setSaved(true);
      
      // Reset success message after a delay
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    }, 1000);
  };
  
  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt);
    if (!entry) {
      setEntry(prompt + '\n\n');
    }
  };
  
  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * promptSuggestions.length);
    handlePromptSelect(promptSuggestions[randomIndex]);
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BookOpen className="text-primary/70 w-5 h-5" />
          <h3 className="text-xl font-medium">Journal Entry</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={getRandomPrompt}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Get prompt
          </button>
          <button
            onClick={handleSave}
            disabled={!entry.trim() || isSaving}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-all ${
              !entry.trim() || isSaving
                ? 'bg-primary/30 text-white/70 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary/90'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save'}</span>
          </button>
        </div>
      </div>
      
      {selectedPrompt && (
        <div className="glass-card p-4 mb-4 flex items-start gap-3">
          <Star className="text-primary/60 w-5 h-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium mb-0.5">Prompt</p>
            <p className="text-sm text-foreground/70">{selectedPrompt}</p>
          </div>
        </div>
      )}
      
      {saved && (
        <div className="glass-card p-4 mb-4 flex items-start gap-3 bg-primary/10 animate-fade-in">
          <AlertCircle className="text-primary w-5 h-5 mt-0.5 flex-shrink-0" />
          <p className="text-sm">Journal entry saved successfully!</p>
        </div>
      )}
      
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        className="w-full p-6 rounded-xl border border-border bg-white/50 min-h-[300px] focus:outline-none focus:ring-1 focus:ring-primary/30 font-light text-lg leading-relaxed resize-none"
        placeholder="Start writing your thoughts..."
      />
      
      <div className="mt-8">
        <h4 className="text-sm uppercase tracking-wider text-primary/70 font-medium mb-3">
          Prompt Suggestions
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {promptSuggestions.slice(0, 4).map((prompt, index) => (
            <button
              key={index}
              onClick={() => handlePromptSelect(prompt)}
              className="text-left p-3 rounded-lg border border-border bg-white/50 text-sm hover:bg-primary/5 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Journal;
