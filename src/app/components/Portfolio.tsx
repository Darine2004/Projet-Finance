import { Portfolio as PortfolioType, Stock } from '../types/stock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Wallet, TrendingUp, TrendingDown, PieChart } from 'lucide-react';

interface PortfolioProps {
  portfolio: PortfolioType;
  stocks: Stock[];
}

export function Portfolio({ portfolio, stocks }: PortfolioProps) {
  // Calculer la valeur totale du portefeuille
  const portfolioValue = portfolio.positions.reduce((total, position) => {
    const stock = stocks.find(s => s.id === position.stockId);
    if (!stock) return total;
    return total + (stock.currentPrice * position.quantity);
  }, 0) + portfolio.cash;

  // Calculer la performance
  const performance = portfolioValue - portfolio.initialValue;
  const performancePercentage = (performance / portfolio.initialValue) * 100;

  // Calculer la composition
  const positionsWithValue = portfolio.positions.map(position => {
    const stock = stocks.find(s => s.id === position.stockId);
    if (!stock) return null;
    
    const currentValue = stock.currentPrice * position.quantity;
    const investedValue = position.averagePurchasePrice * position.quantity;
    const gainLoss = currentValue - investedValue;
    const gainLossPercentage = (gainLoss / investedValue) * 100;

    return {
      ...position,
      stock,
      currentValue,
      investedValue,
      gainLoss,
      gainLossPercentage,
      percentage: (currentValue / portfolioValue) * 100
    };
  }).filter(Boolean);

  const cashPercentage = (portfolio.cash / portfolioValue) * 100;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold flex items-center justify-center gap-2">
          <Wallet className="w-6 h-6" />
          Mon Portefeuille
        </h2>
      </div>

      {/* Vue d'ensemble */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Valeur Totale</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{portfolioValue.toFixed(2)} TND</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {performance >= 0 ? (
                <TrendingUp className="w-5 h-5 text-green-600" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-600" />
              )}
              <div>
                <p className={`text-2xl font-bold ${
                  performance >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {performance >= 0 ? '+' : ''}{performance.toFixed(2)} TND
                </p>
                <p className={`text-sm ${
                  performance >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {performance >= 0 ? '+' : ''}{performancePercentage.toFixed(2)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Liquidités</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{portfolio.cash.toFixed(2)} TND</p>
            <p className="text-sm text-muted-foreground mt-1">
              {cashPercentage.toFixed(1)}% du portefeuille
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Composition du portefeuille */}
      {positionsWithValue.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Composition du Portefeuille
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {positionsWithValue.map((position) => (
              <div key={position.stockId} className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{position.stock.name}</p>
                      <Badge variant="outline" className="text-xs">
                        {position.stock.symbol}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {position.quantity} titre{position.quantity > 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{position.currentValue.toFixed(2)} TND</p>
                    <p className="text-sm text-muted-foreground">
                      {position.percentage.toFixed(1)}%
                    </p>
                  </div>
                </div>

                <Progress value={position.percentage} className="h-2" />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Prix d'achat moyen</p>
                    <p className="font-semibold">
                      {position.averagePurchasePrice.toFixed(2)} TND
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Prix actuel</p>
                    <p className="font-semibold">
                      {position.stock.currentPrice.toFixed(2)} TND
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Valeur investie</p>
                    <p className="font-semibold">
                      {position.investedValue.toFixed(2)} TND
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Plus/Moins-value</p>
                    <p className={`font-semibold ${
                      position.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {position.gainLoss >= 0 ? '+' : ''}{position.gainLoss.toFixed(2)} TND
                      {' '}
                      ({position.gainLoss >= 0 ? '+' : ''}{position.gainLossPercentage.toFixed(2)}%)
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Liquidités */}
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="font-semibold">Liquidités disponibles</p>
                  <p className="text-sm text-muted-foreground">
                    Prêt à investir
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{portfolio.cash.toFixed(2)} TND</p>
                  <p className="text-sm text-muted-foreground">
                    {cashPercentage.toFixed(1)}%
                  </p>
                </div>
              </div>
              <Progress value={cashPercentage} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {positionsWithValue.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <PieChart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-semibold mb-2">Aucune position ouverte</p>
            <p className="text-sm text-muted-foreground">
              Commencez par analyser un titre et simuler une transaction
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}