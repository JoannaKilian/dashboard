import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Person } from "../../models/person.models";

@Injectable({ providedIn: 'root' })

export class PersonService {
    constructor(private http: HttpClient) { }

    getPerson(persons: Person[]){
        
    }
}