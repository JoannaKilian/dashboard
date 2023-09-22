import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { Pet } from 'src/app/core/models/pet.models';
import { PetsService } from 'src/app/core/services/pets.service';

@Component({
  selector: 'app-update-pet-dialog',
  templateUrl: './update-pet-dialog.component.html',
  styleUrls: ['./update-pet-dialog.component.scss']
})
export class UpdatePetDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UpdatePetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dataService: PetsService,
  ) { }

  title: EntityCategory;
  pet: Pet;

  ngOnInit() {
    this.title = this.dialogData.title;
    this.pet = this.dialogData.pet;
  }

  updateHandler(updateItem: Pet) {
    updateItem.id = this.pet.id;
    this.dataService.update(updateItem);
  }
}
