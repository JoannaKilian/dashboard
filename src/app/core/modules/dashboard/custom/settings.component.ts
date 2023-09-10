import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  sections = [
    { title: 'persons', value: 'persons', icon: 'person' },
    { title: 'events', value: 'events', icon: 'cake' },
    { title: 'cars', value: 'cars', icon: 'directions_car' },
    { title: 'pets', value: 'pets', icon: 'pets' },
  ];

}
