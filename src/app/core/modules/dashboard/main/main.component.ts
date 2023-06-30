import {Component} from '@angular/core';
import {Section} from "../../../models/sections.models";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  sections: Section[] = [
    {title: 'Persons', value: 'persons'},
    {title: 'Cars', value: 'cars'},
    {title: 'Pets', value: 'pets'},
    {title: 'Events', value: 'events'},
    {title: 'Food', value: 'food'},
    {title: 'Todos', value: 'todos'},
  ]
}
