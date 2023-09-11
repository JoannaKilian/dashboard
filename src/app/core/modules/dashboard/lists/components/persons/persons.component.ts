import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePersonDialogComponent } from './components/update-person-dialog/update-person-dialog.component';
import { Observable, Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { Alert } from 'src/app/core/models/alert.models';
import { InfoDialogComponent } from 'src/app/core/shared/components/info-dialog/info-dialog/info-dialog.component';
import { EntityCategory, SectionNumber } from 'src/app/core/models/category-list.models';
import { Person } from 'src/app/core/models/person.models';
import { PersonsService } from 'src/app/core/services/persons.service';
import { AddPersonDialogComponent } from './components/add-person-dialog/add-person-dialog.component';
import { Section } from 'src/app/core/models/sections.models';
import { MenuService } from 'src/app/core/services/menu.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss'],
  providers: [AlertService]
})
export class PersonsComponent implements OnInit, OnDestroy {
  data$: Observable<Person[]>;
  alerts$: Observable<Alert[]>;

  title: EntityCategory;
  icon: string;
  sections: Section[];
  headers: string[] = ['name', 'surname'];
  subscription: Subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private menuService: MenuService,
    private dataService: PersonsService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.getSectionInfo(SectionNumber.Persons);
    this.alertService.getAlerts(this.title);
    this.dataService.getList();
    this.data$ = this.dataService.data$;
    this.alerts$ = this.alertService.categoryAlerts$
  }

    getSectionInfo(index: number){
      this.menuService.getSections();
      this.menuService.sections$.subscribe(data => {
        this.sections = data;
      })
    this.title = this.sections[index].title;
    const foundedSection = this.sections.find(section => section.title === this.title);
    if(foundedSection){
      this.icon = foundedSection.icon;
    }
  }

  addDialog() {
    this.dialog.open(AddPersonDialogComponent, {
      width: '500px',
      data: {
        alertService: this.alertService,
        title: this.title,
      }
    });
  }

  editDialog(person: Person) {
    this.dialog.open(UpdatePersonDialogComponent, {
      width: '500px',
      data: {
        title: this.title,
        person: person,
        alertService: this.alertService
      }
    });
  }

  deleteDialog(item: Person) {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: {
        title: `Delete ${item.name}`,
        description: `Are you sure you want to delete ${item.name} ${item.surname}`,
        type: 'submit'
      }
    });
    this.subscription.add(dialogRef.afterClosed().subscribe((result) => {
      if (result === 'submit') {
        this.alertService.deleteAlert(this.title, item.id);
        this.dataService.delete(item);
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
