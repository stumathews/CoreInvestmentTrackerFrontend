import { InvestmentInfluenceFactor } from './InvestmentInfluenceFactor';
import { InvestmentRisk } from './InvestmentRisk';
import { InvestmentGroup } from './InvestmentGroup';
import { Region } from './Region';
import { CustomEntity } from './CustomEntity';

export interface Investment {
  id: number;
  description: string;
  symbol: string;
  valueProposition: string;
  desirabilityStatement: string;
  initialInvestment: number;
  name: string;
  value: number;
  factors?: (FactorsLink)[] | null;
  regions?: (RegionsLink)[] | null;
  risks?: (RisksLink)[] | null;
  groups?: (GroupsLink)[] | null;
  customentities?: (CustomEntity)[] | null;
  createdTime: Date;
  lastModifiedTime: Date;
}
export interface FactorsLink {
  investmentID: number;
  investmentInfluenceFactorID: number;
  investmentInfluenceFactor?: InvestmentInfluenceFactor;
}
export interface RegionsLink {
  investmentID: number;
  regionID: number;
  region?: Region;
}
export interface RisksLink {
  investmentID: number;
  investmentRiskID: number;
  investmentRisk?: InvestmentRisk;
}
export interface GroupsLink {
  investmentID: number;
  investmentGroupID: number;
  investmentGroup?: InvestmentGroup;
}

export interface CustomEntitiesLink {
  investmentID: number;
  investment?: Investment;
  CustomEntityId: number;
  CustomEntity: CustomEntity;
}

