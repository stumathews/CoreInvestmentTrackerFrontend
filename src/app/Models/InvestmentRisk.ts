import { RisksLink } from './Investment';
export interface InvestmentRisk {
  id: number;
  description: string;
  type: number;
  name: string;
  investments?: (RisksLink)[] | null;
  createdTime: Date;
  lastModifiedTime: Date;
}
