interface Position {
  x: number;
  y: number;
}
export interface Note {
  id?: string;
  content: string;
  dragPosition: Position;
}
