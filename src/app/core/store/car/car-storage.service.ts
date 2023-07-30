import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Car } from "../../models/car.models";
import { CarService } from "../../services/cars.service";

@Injectable({ providedIn: 'root' })

export class CarStorageService {

    constructor(
        private http: HttpClient) { };

    private carsUrl = 'https://dashboard-e83c7-default-rtdb.firebaseio.com/cars.json';

    storeVars(){

    }

}