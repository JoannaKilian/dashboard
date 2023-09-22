import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { Pet } from 'src/app/core/models/pet.models';
import { PetsService } from 'src/app/core/services/pets.service';
import { TimeAlertService } from 'src/app/core/services/time-alert.service';


@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.scss']
})
export class PetDetailsComponent implements OnInit, OnDestroy {

  @Input() details: Pet;
  @Input() title: EntityCategory;

  age: number;
  birthdayDate: number;
  vaccinationDate: number;
  averageLifespan: number;
  subscription: Subscription = new Subscription();

  constructor(
    private timeAlertService: TimeAlertService,
    private petsService: PetsService
    ) { }

  ngOnInit(): void {
    this.age = this.timeAlertService.getAge(this.details.dateOfBirth);
    this.averageLifespan = this.petsService.getAverageLifespan(this.details);
    this.birthdayDate = this.timeAlertService.getDaysToAnniversary(this.details.dateOfBirth);
    if (this.details.vaccinationDate) {
      this.vaccinationDate = this.timeAlertService.getCountEndTime(this.details.vaccinationDate);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

