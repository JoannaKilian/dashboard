import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Car } from 'src/app/core/models/car.models';

@Component({
  selector: 'app-update-car-dialog',
  templateUrl: './update-car-dialog.component.html',
  styleUrls: ['./update-car-dialog.component.scss']
})
export class UpdateCarDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<UpdateCarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Car) {}

}
