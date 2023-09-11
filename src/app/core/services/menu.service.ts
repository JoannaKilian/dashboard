import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Section } from '../models/sections.models';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { InfoDialogComponent } from '../shared/components/info-dialog/info-dialog/info-dialog.component';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private currentIndex: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private sections: Section[] = [
    { title: 'persons', value: 'persons', icon: 'person', visible: true },
    { title: 'events', value: 'events', icon: 'cake', visible: true },
    { title: 'cars', value: 'cars', icon: 'directions_car', visible: true },
    { title: 'pets', value: 'pets', icon: 'pets', visible: true },
  ];
  defaultSections: Section[] = JSON.parse(JSON.stringify(this.sections));

  private sectionsSubject: BehaviorSubject<Section[]> = new BehaviorSubject<Section[]>(this.sections);
  public sections$: Observable<Section[]> = this.sectionsSubject.asObservable();

  private url: string;
  uid: string | null;
  subscription: Subscription = new Subscription();

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private userService: UserService,
  ) {
    this.uid = userService.getUid();
    this.url = `${environment.firebaseConfig.databaseURL}/users/${this.uid}/settings/sections.json`;
  };

  getCurrentIndex() {
    return this.currentIndex.asObservable();
  }

  getSections() {
    this.subscription.add(this.http.get<Section[]>(this.url)
      .subscribe({
        next: (response: Section[] | null) => {
          const data = response !== null ? response : this.sections;
          this.sections = data;
          this.sectionsSubject.next(data);
        },
        error: () => {
          this.dialog.open(InfoDialogComponent, {
            data: {
              title: 'Error',
              description: 'Error while fetching sections',
              type: 'error'
            }
          });
        }
      }))
  }

  takeSections() {
    return this.sections
  }

  updateSections(index: number, visible: boolean) {
    const clonedSections: Section[] = JSON.parse(JSON.stringify(this.sections));
    clonedSections[index].visible = visible;
    this.sections = clonedSections;
    this.sectionsSubject.next(clonedSections);
    this.http.put<Section[]>(this.url, clonedSections).subscribe();
  }

  setCurrentIndex(index: number) {
    this.currentIndex.next(index);
  }

  defautl() {
    console.log(this.defaultSections)
    this.sectionsSubject.next(this.defaultSections);
    this.sections = JSON.parse(JSON.stringify(this.defaultSections));
  }
}
