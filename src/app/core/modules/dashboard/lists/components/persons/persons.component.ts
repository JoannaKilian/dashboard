import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Person } from 'src/app/core/models/person.models';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent {
  data: Person[] = [
    { name: 'John', surname: 'Johnson', dateOfBirth: '2000-04-30', socialSecurityNumber: '45673DFT4455', IDcard: 'DFT 4455' },
    { name: 'Alex', surname: 'Johnson', dateOfBirth: '1983-06-02', socialSecurityNumber: '53224HUI5544', IDcard: 'HUI 5544' },
    { name: 'Anna', surname: 'Johnson', dateOfBirth: '1985-05-27', socialSecurityNumber: '56832LOP5522', IDcard: 'LOP 5522' },
    { name: 'Noemi', surname: 'Johnson', dateOfBirth: '2023-04-30', socialSecurityNumber: '345467KDR4087', IDcard: 'KDR 4087' },
    { name: 'Robson', surname: 'Johnson', dateOfBirth: '2020-12-12', socialSecurityNumber: '435345SER3487', IDcard: 'SER 3487' },
    { name: 'Max', surname: 'Johnson', dateOfBirth: '2000-05-22', socialSecurityNumber: '46456HYR4721', IDcard: 'HYR 4721' },
  ];

  headers: string[] = ['name', 'surname', 'dateOfBirth'];

  ngOnInit() {
  }
}
