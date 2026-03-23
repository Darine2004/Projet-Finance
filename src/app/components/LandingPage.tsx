import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Brain, 
  TrendingUp, 
  BarChart3, 
  Shield, 
  Zap, 
  Target,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface LandingPageProps {
  onStart: (initialCash: number) => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  const [initialCash, setInitialCash] = useState('10000');

  const handleStart = () => {
    const cash = parseFloat(initialCash) || 10000;
    onStart(cash);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header with project info */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-block">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 shadow-lg">
                  <Brain className="w-12 h-12 text-white" />
                </div>
                <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              InvestIA
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
              L'Intelligence Artificielle au Service de la Finance Moderne
            </h2>
            
            <div className="mt-6 p-4 bg-white/70 backdrop-blur-sm rounded-lg inline-block shadow-md">
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Projet réalisé par :</span> REZGUI DARINE
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Étudiante en deuxième année Génie Industriel B
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* About Section */}
            <Card className="shadow-xl border-2">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-600" />
                  À Propos de la Plateforme
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  <strong>InvestIA</strong> est une plateforme innovante de simulation d'investissement 
                  boursier qui exploite la puissance de l'intelligence artificielle pour analyser 
                  les marchés financiers et fournir des recommandations d'investissement éclairées.
                </p>
                
                <p className="text-gray-700 leading-relaxed">
                  Notre système analyse des milliers de points de données en temps réel, incluant 
                  l'historique des cours, les volumes de transactions, les actualités sectorielles 
                  et les indicateurs économiques pour générer des prédictions précises.
                </p>

                <div className="pt-4 space-y-3">
                  <h4 className="font-semibold text-lg mb-3">Fonctionnalités clés :</h4>
                  <div className="flex items-start gap-3">
                    <Brain className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Analyse IA Avancée</p>
                      <p className="text-sm text-gray-600">
                        Traitement intelligent de milliers de données de marché
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BarChart3 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Portefeuille Virtuel</p>
                      <p className="text-sm text-gray-600">
                        Gestion complète de vos investissements simulés
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Profils de Risque</p>
                      <p className="text-sm text-gray-600">
                        Trois niveaux de risque adaptés à votre profil
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How to Use Section */}
            <Card className="shadow-xl border-2">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Zap className="w-6 h-6 text-yellow-600" />
                  Principe d'Utilisation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                        1
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Sélection du Titre</h4>
                      <p className="text-sm text-gray-600">
                        Choisissez parmi trois actions avec des profils de risque différents : 
                        TechVision SA (risque élevé), GreenEnergy Corp (risque modéré), 
                        ou SecureBank Group (risque faible).
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                        2
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Analyse IA</h4>
                      <p className="text-sm text-gray-600">
                        Notre algorithme simule l'analyse de milliers de données : historique 
                        des cours, volumes, actualités et indicateurs économiques. Vous obtenez 
                        une tendance projetée, un niveau de confiance et un rendement potentiel.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                        3
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Simulation de Transaction</h4>
                      <p className="text-sm text-gray-600">
                        Achetez ou vendez des titres en temps réel. Le portefeuille se met 
                        à jour automatiquement avec la valeur totale, la composition et 
                        la performance en TND.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                        4
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Suivi du Portefeuille</h4>
                      <p className="text-sm text-gray-600">
                        Consultez la performance globale de vos investissements, visualisez 
                        la composition de votre portefeuille et suivez vos gains ou pertes 
                        en temps réel.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Start Section */}
          <Card className="shadow-2xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Commencer la Simulation</CardTitle>
              <CardDescription className="text-base mt-2">
                Configurez vos liquidités initiales et lancez votre expérience d'investissement
              </CardDescription>
            </CardHeader>
            <CardContent className="max-w-md mx-auto space-y-6">
              <div className="space-y-2">
                <Label htmlFor="initial-cash" className="text-base">
                  Liquidités initiales (TND)
                </Label>
                <Input
                  id="initial-cash"
                  type="number"
                  min="1000"
                  step="1000"
                  value={initialCash}
                  onChange={(e) => setInitialCash(e.target.value)}
                  className="text-lg h-12"
                  placeholder="10000"
                />
                <p className="text-xs text-muted-foreground">
                  Montant recommandé : entre 5 000 TND et 50 000 TND
                </p>
              </div>

              <Button 
                onClick={handleStart}
                size="lg"
                className="w-full text-lg h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
              >
                Accéder à la Plateforme
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <div className="pt-4 border-t">
                <p className="text-xs text-center text-muted-foreground">
                  💡 Cette plateforme est un outil de simulation pédagogique. 
                  Les données et recommandations sont générées à titre d'exemple uniquement.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-md">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Analyse en Temps Réel</h3>
              <p className="text-sm text-gray-600">
                Traitement instantané de milliers de données de marché
              </p>
            </div>

            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-md">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">IA Avancée</h3>
              <p className="text-sm text-gray-600">
                Algorithmes de machine learning pour des prédictions précises
              </p>
            </div>

            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-md">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Gestion du Risque</h3>
              <p className="text-sm text-gray-600">
                Profils adaptés à tous les niveaux de tolérance au risque
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
