import { Stock } from '../types/stock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { TrendingUp, Activity, Shield } from 'lucide-react';

interface StockSelectorProps {
  stocks: Stock[];
  onSelectStock: (stock: Stock) => void;
}

const getRiskColor = (riskLevel: string) => {
  switch (riskLevel) {
    case 'élevé':
      return 'bg-red-500/10 text-red-700 border-red-300';
    case 'modéré':
      return 'bg-orange-500/10 text-orange-700 border-orange-300';
    case 'faible':
      return 'bg-green-500/10 text-green-700 border-green-300';
    default:
      return 'bg-gray-500/10 text-gray-700 border-gray-300';
  }
};

const getRiskIcon = (riskLevel: string) => {
  switch (riskLevel) {
    case 'élevé':
      return <TrendingUp className="w-4 h-4" />;
    case 'modéré':
      return <Activity className="w-4 h-4" />;
    case 'faible':
      return <Shield className="w-4 h-4" />;
    default:
      return null;
  }
};

export function StockSelector({ stocks, onSelectStock }: StockSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Sélectionnez un titre à analyser</h2>
        <p className="text-muted-foreground">
          Choisissez parmi nos trois actions pour obtenir une analyse IA détaillée
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stocks.map((stock) => (
          <Card key={stock.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <CardTitle className="text-xl">{stock.symbol}</CardTitle>
                  <CardDescription className="text-sm mt-1">
                    {stock.name}
                  </CardDescription>
                </div>
                <Badge variant="outline" className={getRiskColor(stock.riskLevel)}>
                  <span className="flex items-center gap-1">
                    {getRiskIcon(stock.riskLevel)}
                    {stock.riskLevel}
                  </span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Secteur</p>
                <p className="font-medium">{stock.sector}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Prix actuel</p>
                <p className="text-2xl font-bold">{stock.currentPrice.toFixed(2)} TND</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Description</p>
                <p className="text-sm">{stock.description}</p>
              </div>

              <Button 
                onClick={() => onSelectStock(stock)} 
                className="w-full"
              >
                Analyser ce titre
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}