import { FactorsLink } from './investment';
export interface InvestmentInfluenceFactor {
  id: number;
  name: string;
  description: string;
  influence: string;
  investments?: (FactorsLink)[] | null;
}

