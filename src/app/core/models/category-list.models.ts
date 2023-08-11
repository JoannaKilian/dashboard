import { Alert } from "./alert.models";

export type EntityCategory = "persons" | "cars" | "pets" | "events" | "food" | "todos";
export interface EntityAlertMap {
    persons: Alert[];
    cars: Alert[];
    pets: Alert[];
    events: Alert[];
    food: Alert[];
    todos: Alert[];
    [key: string]: Alert[];
}