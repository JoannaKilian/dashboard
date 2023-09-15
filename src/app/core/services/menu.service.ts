import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Section } from '../models/sections.models';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../shared/components/info-dialog/info-dialog/info-dialog.component';

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

  private sectionsSubject: BehaviorSubject<Section[]> = new BehaviorSubject<Section[]>(this.sections);
  public sections$: Observable<Section[]> = this.sectionsSubject.asObservable();

  private url: string;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,

  ) {
    this.url = `/settings/sections.json`;
  };

  getCurrentIndex() {
    return this.currentIndex.asObservable();
  }

  getSections() {
    this.http.get<Section[]>(this.url)
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
              description: 'Error while fetching sections data',
              type: 'error'
            }
          });
        }
      })
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
    this.sections.forEach(section => {
      section.visible = true;
    })
    this.sectionsSubject.next(this.sections);
    this.http.put<Section[]>(this.url, this.sections);
  }
}
