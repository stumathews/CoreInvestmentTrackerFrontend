import { RegionsLink } from './investment';
export interface Region {
  id: number;
  description: string;
  name: string;
  investments?: (RegionsLink)[] | null;
}
