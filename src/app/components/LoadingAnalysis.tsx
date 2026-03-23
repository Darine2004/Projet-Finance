import { Card, CardContent } from './ui/card';
import { Brain, TrendingUp, BarChart3, Database, Newspaper } from 'lucide-react';
import { Progress } from './ui/progress';
import { useEffect, useState } from 'react';

interface LoadingAnalysisProps {
  stockName: string;
}

const analysisSteps = [
  { icon: Database, text: 'Chargement de 10 000+ données historiques', duration: 800 },
  { icon: BarChart3, text: 'Analyse des volumes de transactions', duration: 900 },
  { icon: Newspaper, text: 'Traitement des actualités sectorielles', duration: 700 },
  { icon: TrendingUp, text: 'Détection de patterns algorithmiques', duration: 1000 },
  { icon: Brain, text: 'Génération de la recommandation IA', duration: 800 },
];

export function LoadingAnalysis({ stockName }: LoadingAnalysisProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let stepTimeout: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    const totalDuration = analysisSteps.reduce((sum, step) => sum + step.duration, 0);
    let elapsedTime = 0;

    // Animation de progression
    progressInterval = setInterval(() => {
      elapsedTime += 50;
      const newProgress = Math.min((elapsedTime / totalDuration) * 100, 100);
      setProgress(newProgress);
    }, 50);

    // Changement d'étape
    const runSteps = (stepIndex: number) => {
      if (stepIndex < analysisSteps.length) {
        setCurrentStep(stepIndex);
        stepTimeout = setTimeout(() => {
          runSteps(stepIndex + 1);
        }, analysisSteps[stepIndex].duration);
      }
    };

    runSteps(0);

    return () => {
      clearTimeout(stepTimeout);
      clearInterval(progressInterval);
    };
  }, []);

  const CurrentIcon = analysisSteps[currentStep]?.icon || Brain;

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-2xl">
        <CardContent className="pt-8 pb-8 space-y-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping" />
                <div className="relative bg-blue-500 rounded-full p-4">
                  <CurrentIcon className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-2">Analyse IA en cours...</h3>
              <p className="text-muted-foreground">
                Traitement des données pour {stockName}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Progress value={progress} className="h-2" />
            
            <div className="space-y-3">
              {analysisSteps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-blue-50 border-2 border-blue-300' 
                        : isCompleted 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-gray-50 border border-gray-200 opacity-50'
                    }`}
                  >
                    <StepIcon className={`w-5 h-5 ${
                      isActive 
                        ? 'text-blue-600' 
                        : isCompleted 
                        ? 'text-green-600' 
                        : 'text-gray-400'
                    }`} />
                    <span className={`text-sm ${
                      isActive 
                        ? 'text-blue-900 font-semibold' 
                        : isCompleted 
                        ? 'text-green-900' 
                        : 'text-gray-500'
                    }`}>
                      {step.text}
                    </span>
                    {isCompleted && (
                      <span className="ml-auto text-green-600 text-xs">✓</span>
                    )}
                    {isActive && (
                      <span className="ml-auto">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Cette analyse simule le traitement de milliers de données en temps réel
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
