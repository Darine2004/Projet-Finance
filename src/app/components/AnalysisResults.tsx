import { Stock, Analysis } from '../types/stock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Brain, 
  AlertCircle,
  CheckCircle2,
  XCircle,
  ArrowLeft 
} from 'lucide-react';

interface AnalysisResultsProps {
  stock: Stock;
  analysis: Analysis;
  onContinueToTransaction: () => void;
  onBack: () => void;
}

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'hausse':
      return <TrendingUp className="w-5 h-5 text-green-600" />;
    case 'baisse':
      return <TrendingDown className="w-5 h-5 text-red-600" />;
    case 'stable':
      return <Minus className="w-5 h-5 text-blue-600" />;
    default:
      return null;
  }
};

const getTrendColor = (trend: string) => {
  switch (trend) {
    case 'hausse':
      return 'text-green-600';
    case 'baisse':
      return 'text-red-600';
    case 'stable':
      return 'text-blue-600';
    default:
      return 'text-gray-600';
  }
};

const getRecommendationIcon = (recommendation: string) => {
  switch (recommendation) {
    case 'acheter':
      return <CheckCircle2 className="w-6 h-6 text-green-600" />;
    case 'vendre':
      return <XCircle className="w-6 h-6 text-red-600" />;
    case 'conserver':
      return <AlertCircle className="w-6 h-6 text-orange-600" />;
    default:
      return null;
  }
};

const getRecommendationColor = (recommendation: string) => {
  switch (recommendation) {
    case 'acheter':
      return 'bg-green-500/10 text-green-700 border-green-300';
    case 'vendre':
      return 'bg-red-500/10 text-red-700 border-red-300';
    case 'conserver':
      return 'bg-orange-500/10 text-orange-700 border-orange-300';
    default:
      return 'bg-gray-500/10 text-gray-700 border-gray-300';
  }
};

export function AnalysisResults({ 
  stock, 
  analysis, 
  onContinueToTransaction,
  onBack 
}: AnalysisResultsProps) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
      </div>

      <Card className="border-2">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Brain className="w-6 h-6 text-indigo-600" />
                Analyse IA Complète
              </CardTitle>
              <CardDescription className="text-base mt-2">
                {stock.name} ({stock.symbol}) - {stock.sector}
              </CardDescription>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Prix actuel</p>
              <p className="text-2xl font-bold">{stock.currentPrice.toFixed(2)} TND</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {/* Tendance projetée */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              Tendance Projetée
            </h3>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              {getTrendIcon(analysis.trend)}
              <span className={`text-xl font-semibold capitalize ${getTrendColor(analysis.trend)}`}>
                {analysis.trend}
              </span>
            </div>
          </div>

          <Separator />

          {/* Niveau de confiance */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Niveau de Confiance</h3>
              <span className="text-2xl font-bold text-indigo-600">
                {analysis.confidence}%
              </span>
            </div>
            <Progress value={analysis.confidence} className="h-3" />
            <p className="text-sm text-muted-foreground">
              L'algorithme est à {analysis.confidence}% confiant dans cette prédiction
            </p>
          </div>

          <Separator />

          {/* Rendement potentiel */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Rendement Potentiel</h3>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className={`text-3xl font-bold ${
                analysis.potentialReturn >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {analysis.potentialReturn >= 0 ? '+' : ''}{analysis.potentialReturn.toFixed(2)}%
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Estimation du gain ou de la perte sur 3 mois
              </p>
            </div>
          </div>

          <Separator />

          {/* Niveau de risque */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Niveau de Risque</h3>
            <Badge variant="outline" className={`text-base py-2 px-4 ${
              analysis.riskLevel === 'élevé' 
                ? 'bg-red-500/10 text-red-700 border-red-300' 
                : analysis.riskLevel === 'modéré'
                ? 'bg-orange-500/10 text-orange-700 border-orange-300'
                : 'bg-green-500/10 text-green-700 border-green-300'
            }`}>
              Risque {analysis.riskLevel}
            </Badge>
          </div>

          <Separator />

          {/* Recommandation finale */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Recommandation Finale</h3>
            <div className="p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg">
              <div className="flex items-center gap-4">
                {getRecommendationIcon(analysis.recommendation)}
                <div>
                  <p className="text-2xl font-bold capitalize">
                    {analysis.recommendation}
                  </p>
                  <Badge variant="outline" className={`mt-2 ${getRecommendationColor(analysis.recommendation)}`}>
                    Recommandation IA
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Facteurs analysés */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Données Analysées</h3>
            <ul className="space-y-2">
              {analysis.factors.map((factor, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground mt-4">
              Analyse générée le {analysis.analysisDate.toLocaleDateString('fr-FR')} à{' '}
              {analysis.analysisDate.toLocaleTimeString('fr-FR')}
            </p>
          </div>

          <Button 
            onClick={onContinueToTransaction} 
            className="w-full mt-6"
            size="lg"
          >
            Simuler une transaction
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}