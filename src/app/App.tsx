import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { StockSelector } from './components/StockSelector';
import { AnalysisResults } from './components/AnalysisResults';
import { TransactionSimulator } from './components/TransactionSimulator';
import { Portfolio } from './components/Portfolio';
import { LoadingAnalysis } from './components/LoadingAnalysis';
import { STOCKS } from './data/stocks';
import { Stock, Analysis, Portfolio as PortfolioType, Transaction } from './types/stock';
import { simulateAIAnalysis } from './utils/aiAnalysis';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Button } from './components/ui/button';
import { TrendingUp, Wallet, RotateCcw } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './components/ui/alert-dialog';

type View = 'selector' | 'loading' | 'analysis' | 'transaction';

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [currentView, setCurrentView] = useState<View>('selector');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [activeTab, setActiveTab] = useState<'analyze' | 'portfolio'>('analyze');
  const [initialCash, setInitialCash] = useState(10000);

  // Initialiser le portefeuille
  const [portfolio, setPortfolio] = useState<PortfolioType>({
    cash: 10000,
    positions: [],
    initialValue: 10000,
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleStart = (cash: number) => {
    setInitialCash(cash);
    setPortfolio({
      cash,
      positions: [],
      initialValue: cash,
    });
    setShowLanding(false);
  };

  const handleReset = () => {
    setShowLanding(true);
    setCurrentView('selector');
    setSelectedStock(null);
    setAnalysis(null);
    setActiveTab('analyze');
    setPortfolio({
      cash: initialCash,
      positions: [],
      initialValue: initialCash,
    });
    setTransactions([]);
    toast.success('Application réinitialisée avec succès');
  };

  const handleSelectStock = (stock: Stock) => {
    setSelectedStock(stock);
    setCurrentView('loading');

    // Simuler un délai de chargement pour l'analyse IA
    setTimeout(() => {
      const aiAnalysis = simulateAIAnalysis(stock);
      setAnalysis(aiAnalysis);
      setCurrentView('analysis');
    }, 4200); // Durée totale des étapes de chargement
  };

  const handleContinueToTransaction = () => {
    setCurrentView('transaction');
  };

  const handleBackToAnalysis = () => {
    setCurrentView('analysis');
  };

  const handleBackToSelector = () => {
    setCurrentView('selector');
    setSelectedStock(null);
    setAnalysis(null);
  };

  const handleExecuteTransaction = (
    type: 'achat' | 'vente',
    quantity: number,
    price: number
  ) => {
    if (!selectedStock) return;

    const totalCost = quantity * price;

    if (type === 'achat') {
      // Vérifier si l'utilisateur a assez de liquidités
      if (totalCost > portfolio.cash) {
        toast.error('Liquidités insuffisantes');
        return;
      }

      // Mettre à jour le portefeuille
      setPortfolio((prev) => {
        const existingPosition = prev.positions.find(
          (p) => p.stockId === selectedStock.id
        );

        let newPositions;
        if (existingPosition) {
          // Mettre à jour la position existante (moyenne pondérée)
          const newQuantity = existingPosition.quantity + quantity;
          const newAveragePrice =
            (existingPosition.averagePurchasePrice * existingPosition.quantity +
              price * quantity) /
            newQuantity;

          newPositions = prev.positions.map((p) =>
            p.stockId === selectedStock.id
              ? {
                  ...p,
                  quantity: newQuantity,
                  averagePurchasePrice: newAveragePrice,
                }
              : p
          );
        } else {
          // Créer une nouvelle position
          newPositions = [
            ...prev.positions,
            {
              stockId: selectedStock.id,
              quantity,
              averagePurchasePrice: price,
            },
          ];
        }

        return {
          ...prev,
          cash: prev.cash - totalCost,
          positions: newPositions,
        };
      });

      // Enregistrer la transaction
      const transaction: Transaction = {
        id: Date.now().toString(),
        stockId: selectedStock.id,
        type: 'achat',
        quantity,
        price,
        date: new Date(),
      };
      setTransactions((prev) => [...prev, transaction]);

      toast.success(
        `Achat confirmé : ${quantity} titre(s) de ${selectedStock.symbol} à ${price.toFixed(2)} TND`
      );
    } else if (type === 'vente') {
      // Vérifier si l'utilisateur possède assez de titres
      const existingPosition = portfolio.positions.find(
        (p) => p.stockId === selectedStock.id
      );

      if (!existingPosition || existingPosition.quantity < quantity) {
        toast.error('Quantité insuffisante pour cette vente');
        return;
      }

      // Mettre à jour le portefeuille
      setPortfolio((prev) => {
        const newPositions = prev.positions
          .map((p) => {
            if (p.stockId === selectedStock.id) {
              const newQuantity = p.quantity - quantity;
              if (newQuantity === 0) {
                return null; // Supprimer la position
              }
              return {
                ...p,
                quantity: newQuantity,
              };
            }
            return p;
          })
          .filter((p) => p !== null);

        return {
          ...prev,
          cash: prev.cash + totalCost,
          positions: newPositions,
        };
      });

      // Enregistrer la transaction
      const transaction: Transaction = {
        id: Date.now().toString(),
        stockId: selectedStock.id,
        type: 'vente',
        quantity,
        price,
        date: new Date(),
      };
      setTransactions((prev) => [...prev, transaction]);

      toast.success(
        `Vente confirmée : ${quantity} titre(s) de ${selectedStock.symbol} à ${price.toFixed(2)} TND`
      );
    }
  };

  // Si la landing page est affichée
  if (showLanding) {
    return <LandingPage onStart={handleStart} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-2">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  InvestIA
                </h1>
                <p className="text-xs text-muted-foreground">
                  Plateforme d'analyse boursière par IA
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-muted-foreground" />
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Liquidités</p>
                  <p className="font-bold text-lg">{portfolio.cash.toFixed(2)} TND</p>
                </div>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Réinitialiser
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Réinitialiser l'application ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action supprimera toutes vos positions et transactions actuelles.
                      Vous retournerez à la page d'accueil pour configurer un nouveau portefeuille.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={handleReset}>
                      Confirmer
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'analyze' | 'portfolio')}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="analyze">Analyser & Investir</TabsTrigger>
            <TabsTrigger value="portfolio">Mon Portefeuille</TabsTrigger>
          </TabsList>

          <TabsContent value="analyze">
            {currentView === 'selector' && (
              <StockSelector stocks={STOCKS} onSelectStock={handleSelectStock} />
            )}

            {currentView === 'loading' && selectedStock && (
              <LoadingAnalysis stockName={selectedStock.name} />
            )}

            {currentView === 'analysis' && selectedStock && analysis && (
              <AnalysisResults
                stock={selectedStock}
                analysis={analysis}
                onContinueToTransaction={handleContinueToTransaction}
                onBack={handleBackToSelector}
              />
            )}

            {currentView === 'transaction' && selectedStock && (
              <TransactionSimulator
                stock={selectedStock}
                portfolio={portfolio}
                onExecuteTransaction={handleExecuteTransaction}
                onBack={handleBackToAnalysis}
              />
            )}
          </TabsContent>

          <TabsContent value="portfolio">
            <Portfolio portfolio={portfolio} stocks={STOCKS} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-6 bg-white/50">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            InvestIA - L'Intelligence Artificielle au Service de la Finance Moderne
          </p>
          <p className="mt-1 text-xs">
            Projet réalisé par <strong>REZGUI DARINE</strong> - Étudiante en Génie Industriel
          </p>
          <p className="mt-1 text-xs">
            Les données et recommandations sont générées à titre d'exemple uniquement
          </p>
        </div>
      </footer>
    </div>
  );
}
