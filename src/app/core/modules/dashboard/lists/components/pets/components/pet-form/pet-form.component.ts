import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormConfig } from 'src/app/core/models/form-config.models';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { Pet } from 'src/app/core/models/pet.models';
import { UpdatePetDialogComponent } from '../update-pet-dialog/update-pet-dialog.component';
import { PetsService } from 'src/app/core/services/pets.service';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.scss']
})
export class PetFormComponent implements OnInit {

  @Input() data: Pet;
  @Input() title: EntityCategory;
  @Output() submitFormEvent: EventEmitter<Pet> = new EventEmitter();

  formFields: FormConfig[];

  constructor(
    public dialogRef: MatDialogRef<UpdatePetDialogComponent>,
    private dataService: PetsService
  ) { }

  
  ngOnInit(): void {
    this.formFields = this.dataService.getFormFields();
  }

  closeHandler(): void {
    this.dialogRef.close();
  }

  submitHandler(formValue: Pet) {
    this.submitFormEvent.emit(formValue);
  }
}
