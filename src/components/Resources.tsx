
import { ExternalLink, Phone, MessageSquare, BookOpen, Heart } from 'lucide-react';

const Resources = () => {
  const emergencyResources = [
    {
      name: 'National Suicide Prevention Lifeline',
      description: '24/7, free and confidential support',
      contact: '1-800-273-8255',
      icon: <Phone />,
      url: 'https://suicidepreventionlifeline.org/'
    },
    {
      name: 'Crisis Text Line',
      description: 'Text HOME to 741741',
      contact: 'Text HOME to 741741',
      icon: <MessageSquare />,
      url: 'https://www.crisistextline.org/'
    }
  ];
  
  const supportResources = [
    {
      name: 'NAMI (National Alliance on Mental Illness)',
      description: 'Resources, support groups, and education',
      url: 'https://www.nami.org/'
    },
    {
      name: 'Mental Health America',
      description: 'Tools, resources, and screening tests',
      url: 'https://www.mhanational.org/'
    },
    {
      name: 'Psychology Today Therapist Finder',
      description: 'Find therapists in your area',
      url: 'https://www.psychologytoday.com/us/therapists'
    },
    {
      name: 'BetterHelp',
      description: 'Online therapy service',
      url: 'https://www.betterhelp.com/'
    }
  ];
  
  const educationalResources = [
    {
      name: 'HelpGuide',
      description: 'Evidence-based mental health resources',
      url: 'https://www.helpguide.org/'
    },
    {
      name: 'MindTools',
      description: 'Coping skills and strategies',
      url: 'https://www.mindtools.com/'
    }
  ];
  
  return (
    <div>
      {/* Emergency Resources */}
      <section className="mb-10">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <Heart className="text-primary w-5 h-5" />
          <span>Emergency Support</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {emergencyResources.map((resource, index) => (
            <div 
              key={index}
              className="glass-card p-6 flex flex-col hover-lift"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {resource.icon}
                </div>
                <div>
                  <h4 className="font-medium mb-1">{resource.name}</h4>
                  <p className="text-sm text-foreground/70 mb-2">{resource.description}</p>
                  <p className="text-primary font-medium">{resource.contact}</p>
                </div>
              </div>
              <a 
                href={resource.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-4 text-sm flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
              >
                Visit website <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </section>
      
      {/* Support Resources */}
      <section className="mb-10">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <MessageSquare className="text-primary w-5 h-5" />
          <span>Support & Therapy</span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {supportResources.map((resource, index) => (
            <ResourceCard key={index} resource={resource} />
          ))}
        </div>
      </section>
      
      {/* Educational Resources */}
      <section>
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <BookOpen className="text-primary w-5 h-5" />
          <span>Educational Resources</span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {educationalResources.map((resource, index) => (
            <ResourceCard key={index} resource={resource} />
          ))}
        </div>
      </section>
      
      {/* Disclaimer */}
      <div className="mt-12 p-4 border border-border rounded-lg bg-secondary/50 text-sm text-foreground/70">
        <p className="mb-2 font-medium">Important Note:</p>
        <p>
          This app is not a substitute for professional medical advice, diagnosis, or treatment. 
          Always seek the advice of qualified health providers with questions you may have regarding medical conditions.
        </p>
      </div>
    </div>
  );
};

const ResourceCard = ({ 
  resource 
}: { 
  resource: { name: string; description: string; url: string; }
}) => (
  <a
    href={resource.url}
    target="_blank"
    rel="noopener noreferrer"
    className="p-4 rounded-lg border border-border bg-white/50 hover:bg-primary/5 transition-colors flex justify-between items-center hover-lift"
  >
    <div>
      <h4 className="font-medium mb-1">{resource.name}</h4>
      <p className="text-sm text-foreground/70">{resource.description}</p>
    </div>
    <ExternalLink className="w-4 h-4 text-primary/60" />
  </a>
);

export default Resources;
