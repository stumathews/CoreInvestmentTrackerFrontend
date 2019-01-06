import { RisksLink } from './Investment';
import { EntityTypes } from '../Utilities';
export class Activity {
    id: number;
    name: string;
    description: string;
    user: string;
    tag: string;
    details: string;
    atTime: string;
    owningEntityId: number;
    owningEntityType: EntityTypes;
    createdTime: Date;
    lastModifiedTime: Date;

}
