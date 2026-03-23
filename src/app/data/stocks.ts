import { Stock } from '../types/stock';

export const STOCKS: Stock[] = [
  {
    id: 'techvision',
    name: 'TechVision SA',
    symbol: 'TCHV',
    sector: 'Technologie',
    currentPrice: 142.50,
    riskLevel: 'élevé',
    description: 'Leader en solutions d\'intelligence artificielle et cloud computing'
  },
  {
    id: 'greenenergy',
    name: 'GreenEnergy Corp',
    symbol: 'GREN',
    sector: 'Énergie',
    currentPrice: 78.30,
    riskLevel: 'modéré',
    description: 'Producteur d\'énergies renouvelables et solutions durables'
  },
  {
    id: 'securebank',
    name: 'SecureBank Group',
    symbol: 'SECU',
    sector: 'Bancaire',
    currentPrice: 95.80,
    riskLevel: 'faible',
    description: 'Institution bancaire internationale avec forte stabilité'
  }
];
