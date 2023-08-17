export interface Alert {
  id?: string,
  parentId?: string,
  name: string
  message: string;
  deadline: number;
}