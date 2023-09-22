import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { Pet } from 'src/app/core/models/pet.models';
import { PetsService } from 'src/app/core/services/pets.service';


@Component({
  selector: 'app-add-pet-dialog',
  templateUrl: './add-pet-dialog.component.html',
  styleUrls: ['./add-pet-dialog.component.scss']
})
export class AddPetDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddPetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dataService: PetsService,
  ) { }

  title: EntityCategory;
  newItem: Pet;

  ngOnInit() {
    this.title = this.dialogData.title;
  }

  addHandler(item: Pet) {
    const id: string = this.dataService.addUniqueId();
    item.id = id;
    this.newItem = item
    this.dataService.add(this.newItem);
  }

}
