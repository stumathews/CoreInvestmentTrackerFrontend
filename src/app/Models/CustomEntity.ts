import { CustomEntityType } from './CustomEntityType';
import { EntityTypes } from '../Utilities';
import { CustomEntitiesLink } from './Investment';

export interface CustomEntity {
    id: number;
    name: string;
    description: string;
    customEntityType: CustomEntityType | null;
    owningCustomEntity?: CustomEntity | null;
    associations?: (CustomEntity[]) | null;
    owningEntityId: number;
    owningEntityType: number;
    investments?: (CustomEntitiesLink[]) | null;
    investmentIds?: number[];
    createdTime: Date;
    lastModifiedTime: Date;
}



/*
{ 
    "id": 2,
    "name": "Parent",
  "description": "childEntity", 
  "customEntityType": { "id": 1, "name": "test", "description": "test" }, 
  "owningCustomEntity": null, 
  "associations": null, 
  "owningEntityId": 0, 
  "owningEntityType": 0,
   "investments": null, 
   "investmentIds": [] }

*/


