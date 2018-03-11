export interface GraphData {
  nodes?: (NodesEntity)[] | null;
  links?: (LinksEntity)[] | null;
}
export interface NodesEntity {
  name: string;
  value: number;
}
export interface LinksEntity {
  source: number;
  target: number;
  value: number;
}
