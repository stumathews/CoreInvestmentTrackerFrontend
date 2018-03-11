import { RegionsLink } from './Investment';
export interface Region {
  id: number;
  description: string;
  name: string;
  investments?: (RegionsLink)[] | null;
}
