export interface HasInvestmentsEntity {
  id: number;
  name: string;
  description: string;
  investments?: (any)[] | null;
}
