import { Alert } from "./alert.models";

export type EntityCategory = "persons" | "cars" | "pets" | "events";
export interface EntityAlertMap {
    persons: Alert[];
    cars: Alert[];
    pets: Alert[];
    events: Alert[];
    [key: string]: Alert[];
}