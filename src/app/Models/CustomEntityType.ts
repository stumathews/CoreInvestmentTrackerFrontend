import { EntityTypes } from '../Utilities';

export interface CustomEntityType {
    id: number;
    name: string;
    description: string;
    createdTime: Date;
    lastModifiedTime: Date;
    dataType: EntityTypes;
}

/*
"customEntityType": { "id": 1, "name": "test", "description": "test" }, 
*/