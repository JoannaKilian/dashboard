import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { InfoDialogComponent } from 'src/app/core/shared/components/info-dialog/info-dialog/info-dialog.component';
import { EntityCategory, SectionNumber } from 'src/app/core/models/category-list.models';
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
})
export class PetsComponent implements OnInit, OnDestroy {

  data$: Observable<Pet[]>;

  title: EntityCategory;
  icon: string;
  sections: Section[];
  headers: string[] = ['species', 'name']
  subscription: Subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private menuService: MenuService,
    private dataService: PetsService,
  ) { }

  ngOnInit(): void {
    this.getSectionInfo(SectionNumber.Pets);
    this.dataService.getList();
    this.data$ = this.dataService.data$;
  }

  getSectionInfo(index: number) {
    this.menuService.getSections();
    this.sections = this.menuService.takeSections();
    this.title = this.sections[index].title;
    const foundedSection = this.sections.find(section => section.title === this.title);
    if (foundedSection) {
      this.icon = foundedSection.icon;
    }
  }

  addDialog() {
    this.dialog.open(AddPetDialogComponent, {
      width: '500px',
      data: {
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
        this.dataService.delete(item);
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
