import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Car } from "../../models/car.models";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })

export class CarService {

    private carsSubject: BehaviorSubject<Car[]> = new BehaviorSubject<Car[]>([]);
    public cars$: Observable<Car[]> = this.carsSubject.asObservable();

    constructor(private http: HttpClient) { };

    private carsUrl = 'https://dashboard-e83c7-default-rtdb.firebaseio.com/cars.json';

    cars: Car[] = [];

    addCar(car: Car) {
        this.http.post(this.carsUrl, car).subscribe(()=> {
            this.getCars().subscribe((cars: Car[]) => {
                this.carsSubject.next(cars);
              });
        })
    }

    getCars(){
        return this.http.get<Car[]>(this.carsUrl);
    }
}