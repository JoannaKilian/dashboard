import { EntityCategory } from "./category-list.models";

export interface Alert {
  category: EntityCategory,
  parentId: string,
  name: string
  message: string;
  deadline: number;
}