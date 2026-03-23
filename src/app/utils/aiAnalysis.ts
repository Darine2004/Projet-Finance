import { Stock, Analysis } from '../types/stock';

/**
 * Simule une analyse IA basée sur le profil de risque de l'action
 * En production, cela ferait appel à une véritable API d'analyse
 */
export function simulateAIAnalysis(stock: Stock): Analysis {
  // Simulation de temps de traitement
  const baseFactors = [
    'Analyse de 10 000+ points de données historiques',
    'Traitement des volumes de transactions sur 5 ans',
    'Analyse sectorielle et macroéconomique',
    'Détection de patterns algorithmiques',
    'Sentiment des actualités récentes'
  ];

  // Les paramètres varient selon le niveau de risque
  let trendProbabilities: { hausse: number; baisse: number; stable: number };
  let confidenceRange: { min: number; max: number };
  let returnRange: { min: number; max: number };

  switch (stock.riskLevel) {
    case 'élevé':
      trendProbabilities = { hausse: 0.45, baisse: 0.35, stable: 0.20 };
      confidenceRange = { min: 60, max: 85 };
      returnRange = { min: -15, max: 25 };
      break;
    case 'modéré':
      trendProbabilities = { hausse: 0.40, baisse: 0.30, stable: 0.30 };
      confidenceRange = { min: 70, max: 90 };
      returnRange = { min: -8, max: 15 };
      break;
    case 'faible':
      trendProbabilities = { hausse: 0.35, baisse: 0.25, stable: 0.40 };
      confidenceRange = { min: 75, max: 95 };
      returnRange = { min: -5, max: 10 };
      break;
  }

  // Déterminer la tendance selon les probabilités
  const rand = Math.random();
  let trend: 'hausse' | 'baisse' | 'stable';
  
  if (rand < trendProbabilities.hausse) {
    trend = 'hausse';
  } else if (rand < trendProbabilities.hausse + trendProbabilities.baisse) {
    trend = 'baisse';
  } else {
    trend = 'stable';
  }

  // Générer le niveau de confiance
  const confidence = Math.floor(
    Math.random() * (confidenceRange.max - confidenceRange.min) + confidenceRange.min
  );

  // Générer le rendement potentiel en fonction de la tendance
  let potentialReturn: number;
  if (trend === 'hausse') {
    potentialReturn = Math.random() * (returnRange.max - 2) + 2;
  } else if (trend === 'baisse') {
    potentialReturn = Math.random() * (returnRange.min + 2) + returnRange.min;
  } else {
    potentialReturn = Math.random() * 4 - 2; // Entre -2% et +2%
  }

  // Arrondir à 2 décimales
  potentialReturn = Math.round(potentialReturn * 100) / 100;

  // Déterminer la recommandation
  let recommendation: 'acheter' | 'vendre' | 'conserver';
  if (trend === 'hausse' && confidence > 75) {
    recommendation = 'acheter';
  } else if (trend === 'baisse' && confidence > 75) {
    recommendation = 'vendre';
  } else {
    recommendation = 'conserver';
  }

  return {
    trend,
    confidence,
    potentialReturn,
    riskLevel: stock.riskLevel,
    recommendation,
    analysisDate: new Date(),
    factors: baseFactors
  };
}

/**
 * Simule une fluctuation de prix pour les transactions
 */
export function simulatePriceFluctuation(basePrice: number, riskLevel: string): number {
  let maxFluctuation: number;
  
  switch (riskLevel) {
    case 'élevé':
      maxFluctuation = 0.03; // ±3%
      break;
    case 'modéré':
      maxFluctuation = 0.015; // ±1.5%
      break;
    case 'faible':
      maxFluctuation = 0.008; // ±0.8%
      break;
    default:
      maxFluctuation = 0.01;
  }

  const fluctuation = (Math.random() - 0.5) * 2 * maxFluctuation;
  return Math.round((basePrice * (1 + fluctuation)) * 100) / 100;
}
