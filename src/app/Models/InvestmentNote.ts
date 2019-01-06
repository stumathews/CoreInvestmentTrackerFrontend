import { RisksLink } from './Investment';
import { EntityTypes } from '../Utilities';
export interface InvestmentNote {
  id: number;
  name: string;
  description: string;
  owningEntityId: number;
  owningEntityType: EntityTypes;
  createdTime: Date;
  lastModifiedTime: Date;
}

/*
[
    {
        "id":17,
        "name":"note for investment#0",
        "description":"note for investment#0",
        "owningEntityId":1,
        "owningEntityType":0
    }
]
*/
