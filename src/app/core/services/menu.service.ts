import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Section } from '../models/sections.models';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private currentIndex: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  sections: Section[] = [
    { title: 'persons', value: 'persons', icon: 'person' },
    { title: 'events', value: 'events', icon: 'cake' },
    { title: 'cars', value: 'cars', icon: 'directions_car' },
    { title: 'pets', value: 'pets', icon: 'pets' },
    { title: 'links', value: 'links', icon: 'link' },
  ];

  getCurrentIndex() {
    return this.currentIndex.asObservable();
  }

  getSections() {
    return this.sections;
  }

  setCurrentIndex(index: number) {
    this.currentIndex.next(index);
  }
}
