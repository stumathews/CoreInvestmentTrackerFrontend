export interface DbEntity {
    id: number;
    description: string;
    name: string;
    createdTime: Date;
    lastModifiedTime: Date;
    isFlagged: boolean;
    points: number;
  }
