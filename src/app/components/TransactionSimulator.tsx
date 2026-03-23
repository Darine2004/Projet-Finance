import { useState } from 'react';
import { Stock, Portfolio } from '../types/stock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { ArrowLeft, ShoppingCart, TrendingDown, AlertCircle } from 'lucide-react';
import { simulatePriceFluctuation } from '../utils/aiAnalysis';

interface TransactionSimulatorProps {
  stock: Stock;
  portfolio: Portfolio;
  onExecuteTransaction: (type: 'achat' | 'vente', quantity: number, price: number) => void;
  onBack: () => void;
}

export function TransactionSimulator({ 
  stock, 
  portfolio, 
  onExecuteTransaction,
  onBack 
}: TransactionSimulatorProps) {
  const [quantity, setQuantity] = useState<string>('1');
  const [transactionType, setTransactionType] = useState<'achat' | 'vente'>('achat');

  // Prix actuel avec légère fluctuation
  const currentPrice = simulatePriceFluctuation(stock.currentPrice, stock.riskLevel);

  // Trouver la position actuelle de cette action dans le portefeuille
  const currentPosition = portfolio.positions.find(p => p.stockId === stock.id);
  const ownedQuantity = currentPosition?.quantity || 0;

  const quantityNum = parseInt(quantity) || 0;
  const totalCost = quantityNum * currentPrice;

  const canBuy = totalCost <= portfolio.cash && quantityNum > 0;
  const canSell = quantityNum > 0 && quantityNum <= ownedQuantity;

  const handleExecute = () => {
    if (transactionType === 'achat' && canBuy) {
      onExecuteTransaction('achat', quantityNum, currentPrice);
      setQuantity('1');
    } else if (transactionType === 'vente' && canSell) {
      onExecuteTransaction('vente', quantityNum, currentPrice);
      setQuantity('1');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à l'analyse
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Transaction */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Simuler une Transaction
            </CardTitle>
            <CardDescription>
              {stock.name} ({stock.symbol})
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg space-y-2">
              <p className="text-sm text-muted-foreground">Prix actuel du marché</p>
              <p className="text-3xl font-bold text-blue-600">
                {currentPrice.toFixed(2)} TND
              </p>
              <Badge variant="outline" className="text-xs">
                Mise à jour en temps réel
              </Badge>
            </div>

            <Tabs value={transactionType} onValueChange={(v) => setTransactionType(v as 'achat' | 'vente')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="achat">Acheter</TabsTrigger>
                <TabsTrigger value="vente" disabled={ownedQuantity === 0}>
                  Vendre
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="achat" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="buy-quantity">Nombre de titres</Label>
                  <Input
                    id="buy-quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Entrez la quantité"
                  />
                </div>

                <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Coût total</span>
                    <span className="font-bold">{totalCost.toFixed(2)} TND</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Liquidités disponibles</span>
                    <span className={portfolio.cash >= totalCost ? 'text-green-600' : 'text-red-600'}>
                      {portfolio.cash.toFixed(2)} TND
                    </span>
                  </div>
                </div>

                {!canBuy && quantityNum > 0 && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-600">
                      Liquidités insuffisantes pour cette transaction
                    </p>
                  </div>
                )}

                <Button 
                  onClick={handleExecute} 
                  disabled={!canBuy}
                  className="w-full"
                  size="lg"
                >
                  Confirmer l'achat
                </Button>
              </TabsContent>

              <TabsContent value="vente" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sell-quantity">Nombre de titres</Label>
                  <Input
                    id="sell-quantity"
                    type="number"
                    min="1"
                    max={ownedQuantity}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Entrez la quantité"
                  />
                  <p className="text-xs text-muted-foreground">
                    Vous possédez {ownedQuantity} titre(s)
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Montant de la vente</span>
                    <span className="font-bold">{totalCost.toFixed(2)} TND</span>
                  </div>
                  {currentPosition && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Prix d'achat moyen</span>
                      <span>{currentPosition.averagePurchasePrice.toFixed(2)} TND</span>
                    </div>
                  )}
                  {currentPosition && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Plus/Moins-value</span>
                      <span className={
                        currentPrice > currentPosition.averagePurchasePrice 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }>
                        {((currentPrice - currentPosition.averagePurchasePrice) * quantityNum).toFixed(2)} TND
                      </span>
                    </div>
                  )}
                </div>

                {!canSell && quantityNum > 0 && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-600">
                      Vous ne possédez pas assez de titres pour cette vente
                    </p>
                  </div>
                )}

                <Button 
                  onClick={handleExecute} 
                  disabled={!canSell}
                  className="w-full"
                  size="lg"
                  variant="destructive"
                >
                  Confirmer la vente
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Informations sur le titre */}
        <Card>
          <CardHeader>
            <CardTitle>Informations du Titre</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Nom complet</p>
              <p className="font-semibold">{stock.name}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Symbole</p>
              <p className="font-semibold">{stock.symbol}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Secteur</p>
              <p className="font-semibold">{stock.sector}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Niveau de risque</p>
              <Badge variant="outline" className={
                stock.riskLevel === 'élevé' 
                  ? 'bg-red-500/10 text-red-700 border-red-300' 
                  : stock.riskLevel === 'modéré'
                  ? 'bg-orange-500/10 text-orange-700 border-orange-300'
                  : 'bg-green-500/10 text-green-700 border-green-300'
              }>
                {stock.riskLevel}
              </Badge>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Description</p>
              <p className="text-sm">{stock.description}</p>
            </div>

            {ownedQuantity > 0 && currentPosition && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-2 mt-4">
                <p className="font-semibold text-blue-900">Votre Position</p>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Quantité détenue</span>
                  <span className="font-semibold">{ownedQuantity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Prix d'achat moyen</span>
                  <span className="font-semibold">
                    {currentPosition.averagePurchasePrice.toFixed(2)} TND
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Valeur actuelle</span>
                  <span className="font-semibold">
                    {(currentPrice * ownedQuantity).toFixed(2)} TND
                  </span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-blue-300">
                  <span className="text-muted-foreground">Plus/Moins-value</span>
                  <span className={
                    currentPrice > currentPosition.averagePurchasePrice 
                      ? 'text-green-600 font-semibold' 
                      : 'text-red-600 font-semibold'
                  }>
                    {((currentPrice - currentPosition.averagePurchasePrice) * ownedQuantity).toFixed(2)} TND
                    {' '}
                    ({(((currentPrice - currentPosition.averagePurchasePrice) / currentPosition.averagePurchasePrice) * 100).toFixed(2)}%)
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}