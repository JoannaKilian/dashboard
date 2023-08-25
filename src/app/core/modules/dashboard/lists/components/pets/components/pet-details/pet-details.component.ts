import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Alert } from 'src/app/core/models/alert.models';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { Pet } from 'src/app/core/models/pet.models';
import { AlertService } from 'src/app/core/services/alert.service';
import { PetsService } from 'src/app/core/services/pets.service';
import { TimeAlertService } from 'src/app/core/services/time-alert.service';


@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.scss']
})
export class PetDetailsComponent implements OnInit, OnDestroy {

  @Input() details: Pet;
  @Input() alerts$: Observable<Alert[]>;
  @Input() title: EntityCategory;

  age: number;
  birthdayDate: number;
  vaccinationDate: number;
  averageLifespan: number;
  alerts: Alert[];
  subscription: Subscription = new Subscription();

  constructor(
    private timeAlertService: TimeAlertService,
    private alertService: AlertService,
    private petsService: PetsService
    ) { }

  ngOnInit(): void {
    this.age = this.timeAlertService.getAge(this.details.dateOfBirth);
    this.averageLifespan = this.petsService.getAverageLifespan(this.details);
    this.birthdayDate = this.timeAlertService.getDaysToAnniversary(this.details.dateOfBirth);
    if (this.details.vaccinationDate) {
      this.vaccinationDate = this.timeAlertService.getCountEndTime(this.details.vaccinationDate);
    }
    this.subscription.add(this.alerts$.subscribe(data => {
      this.alerts = data;
    }));
    if (this.alerts?.length > 0) {
      this.updateTimeAlert(this.birthdayDate, 'Birthday');
    } else if(this.alerts?.length > 0 && this.details.vaccinationDate){
      this.updateTimeAlert(this.vaccinationDate, 'Vaccination Date');
    }
  }

  updateTimeAlert(expirationDate: number, name: string): void {
    const needUpdate = this.alertService.isUpdateAlertNeeded(this.details.id, name, expirationDate);

    if (needUpdate && expirationDate <= 30) {
      this.alertService.updateAlert(this.title, this.details.id,  this.details.species, this.details.name, expirationDate, name);
    } else if (needUpdate) {
      this.alertService.deleteAlertByItem(this.title, this.details.id, name)
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

