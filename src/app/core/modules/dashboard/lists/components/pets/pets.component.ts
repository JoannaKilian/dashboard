import { Component } from '@angular/core';
import { Pet } from 'src/app/core/models/pet.models';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent {

  data: Pet[] = [
    { name: 'Miau', species: 'Cat', breed: 'Maine Coon', dateOfBirth: '2018-03-15', color: 'Red', favoriteToy: 'Feathered dangler', vaccinationDate: '2024-08-10', averageLifeLength: 15 },
    { name: 'Buddy', species: 'Dog', breed: 'Golden Retriever', dateOfBirth: '2019-05-20', color: 'Golden', favoriteToy: 'Rubber ball', vaccinationDate: '2023-07-15', averageLifeLength: 12 },
    { name: 'Fiona', species: 'Horse', breed: 'Hanoverian', dateOfBirth: '2015-11-03', color: 'Chestnut', favoriteToy: 'Sack for tossing', vaccinationDate: '2023-12-05', averageLifeLength: 25 },
    { name: 'Hammy', species: 'Hamster', breed: 'Dwarf Hamster', dateOfBirth: '2022-02-10', color: 'Grey', favoriteToy: 'Running wheel', vaccinationDate: '2024-01-18', averageLifeLength: 2 },
    { name: 'Shelly', species: 'Turtle', breed: 'Red-Eared Slider', dateOfBirth: '2020-08-25', color: 'Green', favoriteToy: 'Floating platform', vaccinationDate: '2023-10-12', averageLifeLength: 30 },
  ];

  headers: string[] = ['species', 'breed', 'name']

}
