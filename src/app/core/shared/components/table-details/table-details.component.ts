import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-details',
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.scss']
})
export class TableDetailsComponent implements OnInit {
  @Input() dateOfBirth: Date;
  @Input() socialSecurityNumber: string;
  @Input() IDcard: string;

  age: number;
  currentDate = new Date();
  dateOfBirthAsDate = new Date();
  tensOfAge: number;

  ngOnInit(): void {
    this.dateOfBirthAsDate = new Date(this.dateOfBirth);

    if (this.dateOfBirthAsDate < this.currentDate) {
      const ageDelta = this.currentDate.getTime() - this.dateOfBirthAsDate.getTime();
      this.age = Math.floor(ageDelta / (1000 * 60 * 60 * 24 * 365));
      this.tensOfAge = Math.floor(this.age / 10)
    }
  }

  getIconAge(): string {
    if (this.age < 1) {
      return 'child_friendly'
    } else if (this.age >= 1 && this.age < 18) {
      return 'child_care'
    } else {
      return 'person'
    }
  }
}

