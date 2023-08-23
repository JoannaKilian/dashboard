import { Alert } from "./alert.models";

export type EntityCategory = "persons" | "cars" | "pets" | "employees" | "food" | "todos";
export interface EntityAlertMap {
    persons: Alert[];
    cars: Alert[];
    pets: Alert[];
    employees: Alert[];
    food: Alert[];
    todos: Alert[];
    [key: string]: Alert[];
}