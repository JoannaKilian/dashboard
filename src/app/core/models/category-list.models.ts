import { Alert } from "./alert.models";

export enum SectionNumber {
    Persons = 0,
    Events =  1,
    Cars = 2,
    Pets = 3,
  }

export type EntityCategory = "persons" | "events" | "cars" | "pets" | "links";
export interface EntityAlertMap {
    persons: Alert[];
    events: Alert[];
    cars: Alert[];
    pets: Alert[];
    [key: string]: Alert[];
}