﻿import { GroupsLink } from './Investment';
export interface InvestmentGroup {
  id: number;
  name: string;
  description: string;
  type: string;
  investments?: (GroupsLink)[] | null;
  parent: InvestmentGroup;
  children: InvestmentGroup[];
}
