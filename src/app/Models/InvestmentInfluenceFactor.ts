import { FactorsLink } from './Investment';
export interface InvestmentInfluenceFactor {
  id: number;
  name: string;
  description: string;
  influence: string;
  investments?: (FactorsLink)[] | null;
  createdTime: Date;
  lastModifiedTime: Date;
}

