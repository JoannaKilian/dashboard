import { Component, Input, OnInit } from '@angular/core';
import { Pet } from 'src/app/core/models/pet.models';
import { TimeAlertService } from 'src/app/core/services/time-alert.service.service';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.scss']
})
export class PetDetailsComponent implements OnInit {

  @Input() petDetails: Pet;

  age: number;
  daysUntilBirthday: number;
  toVaccinationDate: number;

  constructor(private timeAlertService: TimeAlertService) { }

  ngOnInit(): void {
    this.age = this.timeAlertService.getAge(this.petDetails.dateOfBirth);
    this.daysUntilBirthday = this.timeAlertService.getDaysToAnniversary(this.petDetails.dateOfBirth);
    this.toVaccinationDate = this.timeAlertService.getCountEndTime(this.petDetails.vaccinationDate);
    this.checkTimeAlert(this.daysUntilBirthday);
    this.checkTimeAlert(this.toVaccinationDate);
  }

  checkTimeAlert(days: number): void {
    if (days <= 30) {
      this.timeAlertService.setTimeAlert("Pets", this.petDetails.species, this.petDetails.name, days);
    }
  }
}

