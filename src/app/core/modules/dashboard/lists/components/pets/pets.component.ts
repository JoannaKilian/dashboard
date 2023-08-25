import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { Alert } from 'src/app/core/models/alert.models';
import { InfoDialogComponent } from 'src/app/core/shared/components/info-dialog/info-dialog/info-dialog.component';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { Pet } from 'src/app/core/models/pet.models';
import { PetsService } from 'src/app/core/services/pets.service';
import { AddPetDialogComponent } from './components/add-pet-dialog/add-pet-dialog.component';
import { UpdatePetDialogComponent } from './components/update-pet-dialog/update-pet-dialog.component';
import { MenuService } from 'src/app/core/services/menu.service';
import { Section } from 'src/app/core/models/sections.models';


@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
  providers: [AlertService]
})
export class PetsComponent implements OnInit, OnDestroy {

  data$: Observable<Pet[]>;
  alerts$: Observable<Alert[]>;

  title: EntityCategory;
  icon: string;
  sections: Section[];
  headers: string[] = ['species', 'name']
  subscription: Subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private menuService: MenuService,
    private dataService: PetsService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.getSectionInfo(2);
    this.alertService.getAlerts(this.title);
    this.dataService.getList();
    this.data$ = this.dataService.data$;
    this.alerts$ = this.alertService.categoryAlerts$
  }

  getSectionInfo(index: number){
    this.sections = this.menuService.getSections();
    this.title = this.sections[index].title;
    const foundedSection = this.sections.find(section => section.title === this.title);
    if(foundedSection){
      this.icon = foundedSection.icon;
    }
  }

  addDialog() {
    this.dialog.open(AddPetDialogComponent, {
      width: '500px',
      data: {
        alertService: this.alertService,
        title: this.title,
      }
    });
  }

  editDialog(pet: Pet) {
    this.dialog.open(UpdatePetDialogComponent, {
      width: '500px',
      data: {
        title: this.title,
        pet: pet,
        alertService: this.alertService
      }
    });
  }

  deleteDialog(item: Pet) {

    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: {
        title: `Delete ${item.name}`,
        description: `Are you sure you want to delete ${item.name} ${item.species}`,
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
