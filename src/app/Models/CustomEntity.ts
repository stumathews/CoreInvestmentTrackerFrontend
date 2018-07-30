import { CustomEntityType } from "./CustomEntityType";

export interface CustomEntity {
    id: number;
    name: string;
    description: string;
    customEntityType: CustomEntityType;
    owningCustomEntity: CustomEntity;
    associations: CustomEntity[];
}
