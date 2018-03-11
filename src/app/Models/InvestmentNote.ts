import { RisksLink } from './investment';
import { EntityTypes } from '../Utilities';
export interface InvestmentNote {
  id: number;
  name: string;
  description: string;
  owningEntityId: number;
  owningEntityType: EntityTypes;
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
