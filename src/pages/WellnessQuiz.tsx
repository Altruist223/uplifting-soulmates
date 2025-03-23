import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ArrowRight, Wind, Info, Save, Printer } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

type Question = {
  id: number;
  text: string;
  options: string[];
};

const WellnessQuiz = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollTo(0, 0);
    };
    handleScroll();
  }, []);

  useEffect(() => {
    setProgress((currentQuestionIndex / questions.length) * 100);
    setSelectedOption(null);
  }, [currentQuestionIndex]);

  const questions: Question[] = [
    {
      id: 1,
      text: "Over the past 2 weeks, how often have you felt little interest or pleasure in doing things?",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    },
    {
      id: 2,
      text: "Over the past 2 weeks, how often have you felt down, depressed, or hopeless?",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    },
    {
      id: 3,
      text: "Over the past 2 weeks, how often have you had trouble falling asleep, staying asleep, or sleeping too much?",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    },
    {
      id: 4,
      text: "Over the past 2 weeks, how often have you felt tired or had little energy?",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    },
    {
      id: 5,
      text: "Over the past 2 weeks, how often have you had poor appetite or overeaten?",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    },
    {
      id: 6,
      text: "Over the past 2 weeks, how often have you felt bad about yourself or that you're a failure or have let yourself or your family down?",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    },
    {
      id: 7,
      text: "Over the past 2 weeks, how often have you had trouble concentrating on things, such as reading the newspaper or watching television?",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    },
    {
      id: 8,
      text: "Over the past 2 weeks, how often have you felt that you would be better off dead or hurting yourself in some way?",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    }
  ];

  const handleAnswer = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    
    setTimeout(() => {
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = optionIndex;
      setAnswers(newAnswers);

      if (currentQuestionIndex < questions.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }, 400);
      } else {
        setShowResults(true);
      }
    }, 300);
  };

  const calculateResult = () => {
    const score = answers.reduce((sum, answer) => sum + answer, 0);
    
    if (score <= 4) {
      return {
        level: "Minimal",
        message: "Your responses suggest minimal or no symptoms of depression. Continue practicing self-care and mindfulness.",
        recommendations: ["Regular exercise", "Mindful breathing", "Journaling", "Maintain social connections"]
      };
    } else if (score <= 9) {
      return {
        level: "Mild",
        message: "Your responses suggest mild symptoms. It's a good time to focus on self-care strategies.",
        recommendations: ["Use the breathing exercises", "Journal regularly", "Track your mood", "Consider talking to a trusted friend"]
      };
    } else if (score <= 14) {
      return {
        level: "Moderate",
        message: "Your responses suggest moderate symptoms. Consider seeking additional support.",
        recommendations: ["All self-care strategies", "Check the resources page", "Consider speaking with a healthcare provider", "Set small, achievable goals"]
      };
    } else if (score <= 19) {
      return {
        level: "Moderately severe",
        message: "Your responses suggest moderately severe symptoms. It's recommended to speak with a healthcare provider.",
        recommendations: ["Continue self-care", "Speak with a healthcare provider", "Explore professional support options in the resources page", "Be kind to yourself"]
      };
    } else {
      return {
        level: "Severe",
        message: "Your responses suggest severe symptoms. Please reach out to a healthcare provider or mental health professional as soon as possible.",
        recommendations: ["Contact a healthcare provider", "Check crisis resources", "Reach out to a trusted person", "Know that help is available"]
      };
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
    setProgress(0);
    window.scrollTo(0, 0);
  };

  const printResults = () => {
    window.print();
    toast({
      title: "Print dialog opened",
      description: "You can now print or save your results as PDF.",
    });
  };

  const saveResults = async () => {
    const result = calculateResult();
    const score = answers.reduce((sum, answer) => sum + answer, 0);
    
    try {
      if (!user) {
        toast({
          title: 'Results saved locally',
          description: 'Sign in to save your results to your account.',
        });
        
        localStorage.setItem('wellnessQuizResult', JSON.stringify({
          date: new Date().toISOString(),
          score,
          level: result.level,
          recommendations: result.recommendations
        }));
        
        return;
      }
      
      const { error } = await supabase
        .from('quiz_results')
        .insert({
          user_id: user.id,
          score,
          level: result.level,
          recommendations: result.recommendations
        });
        
      if (error) throw error;
      
      toast({
        title: 'Results saved',
        description: 'Your quiz results have been saved to your profile.',
      });
      
    } catch (error: any) {
      toast({
        title: 'Error saving results',
        description: error.message,
        variant: 'destructive',
      });
      
      localStorage.setItem('wellnessQuizResult', JSON.stringify({
        date: new Date().toISOString(),
        score,
        level: result.level,
        recommendations: result.recommendations
      }));
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        header, footer, nav, .print\\:hidden {
          display: none !important;
        }
        body, html {
          background: white !important;
        }
        main {
          padding: 0 !important;
        }
        h1 {
          font-size: 24px !important;
          margin-bottom: 16px !important;
        }
        .glass-card {
          box-shadow: none !important;
          border: none !important;
          padding: 0 !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
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
          
          <h1 className="text-3xl md:text-4xl font-light mb-4">Wellness Check</h1>
          <p className="text-foreground/70 mb-8">
            This brief questionnaire can help you understand your current mental well-being. 
            Your answers are private and not stored anywhere.
          </p>
          
          <div className="glass-card p-6 mb-8">
            {!showResults ? (
              <div>
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-foreground/60 mb-2">
                    <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                
                <motion.div
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl mb-6">{currentQuestion.text}</h2>
                  
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full p-4 text-left rounded-md border transition-all hover:bg-primary/5 ${
                          selectedOption === index 
                            ? 'border-primary bg-primary/10' 
                            : answers[currentQuestionIndex] === index 
                              ? 'border-primary bg-primary/10' 
                              : 'border-border'
                        }`}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="print:mx-0 print:p-0"
              >
                {(() => {
                  const result = calculateResult();
                  const score = answers.reduce((sum, answer) => sum + answer, 0);
                  return (
                    <div>
                      <h2 className="text-2xl mb-4">Your Results</h2>
                      
                      <Card className="mb-6 border-primary/20">
                        <CardContent className="p-6">
                          <div className="text-lg mb-2 flex justify-between items-center">
                            <span>Level: <span className="font-medium">{result.level}</span></span>
                            <span className="text-sm bg-primary/10 text-primary py-1 px-3 rounded-full">Score: {score}/{questions.length * 3}</span>
                          </div>
                          <p className="text-foreground/80">{result.message}</p>
                        </CardContent>
                      </Card>
                      
                      <div className="mb-6">
                        <h3 className="text-lg mb-3">Recommendations:</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {result.recommendations.map((recommendation, index) => (
                            <Card key={index} className="border-primary/10 hover:border-primary/30 transition-colors">
                              <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                                  <span>{recommendation}</span>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mt-8 print:hidden">
                        <Button 
                          onClick={restartQuiz}
                          variant="outline"
                        >
                          Retake Quiz
                        </Button>
                        <Button
                          onClick={saveResults}
                          variant="outline"
                          className="gap-2"
                        >
                          <Save className="w-4 h-4" />
                          Save Results
                        </Button>
                        <Button
                          onClick={printResults}
                          variant="outline"
                          className="gap-2"
                        >
                          <Printer className="w-4 h-4" />
                          Print Results
                        </Button>
                      </div>
                      
                      <div className="mt-6 p-4 border border-dashed border-primary/20 rounded-md bg-primary/5 print:hidden">
                        <h4 className="font-medium mb-2">How to use these results:</h4>
                        <p className="text-sm text-foreground/80 mb-3">
                          Use this assessment as a starting point for understanding your mental wellbeing. 
                          Remember that this quiz is based on the PHQ-9, a screening tool for depression, 
                          but it is not a diagnostic tool or a substitute for professional help.
                        </p>
                        <p className="text-sm text-foreground/80">
                          If you're experiencing distress, please consult a healthcare professional.
                          Explore the resources section for more information and support options.
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </div>
          
          {!showResults && (
            <div className="text-sm text-foreground/60 text-center max-w-lg mx-auto">
              Note: This questionnaire is for educational purposes and is not a diagnostic tool.
              Your responses are not stored and remain private.
            </div>
          )}
          
          {showResults && (
            <div className="mt-12 print:hidden">
              <h3 className="text-xl mb-4">Where to go from here</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link to="/breathe" className="glass-card p-6 hover-lift hover:border-primary/30 transition-all">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Wind className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-medium mb-2">Try a breathing exercise</h4>
                  <p className="text-foreground/70 mb-3">Calm your mind with guided breathing techniques.</p>
                  <div className="flex items-center gap-1 text-primary">
                    <span className="text-sm">Start now</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
                
                <Link to="/resources" className="glass-card p-6 hover-lift hover:border-primary/30 transition-all">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Info className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-medium mb-2">Explore resources</h4>
                  <p className="text-foreground/70 mb-3">Find helpful information and professional support options.</p>
                  <div className="flex items-center gap-1 text-primary">
                    <span className="text-sm">View resources</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default WellnessQuiz;
