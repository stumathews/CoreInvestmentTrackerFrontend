import { RisksLink } from './investment';
export interface InvestmentRisk {
  id: number;
  description: string;
  type: number;
  name: string;
  investments?: (RisksLink)[] | null;
}
