import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormConfig } from 'src/app/core/models/form-config.models';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { Bill } from 'src/app/core/models/bills.models';
import { UpdateBillDialogComponent } from '../update-bill-dialog/update-bill-dialog.component';
import { BillsService } from 'src/app/core/services/bills.service';

@Component({
  selector: 'app-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.scss']
})
export class BillFormComponent implements OnInit {

  @Input() data: Bill;
  @Input() title: EntityCategory;
  @Output() submitFormEvent: EventEmitter<Bill> = new EventEmitter();

  formFields: FormConfig[];

  constructor(
    public dialogRef: MatDialogRef<UpdateBillDialogComponent>,
    private dataService: BillsService
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.formFields = this.dataService.getFormFields();
  }

  closeHandler(): void {
    this.dialogRef.close();
  }

  submitHandler(formValue: Bill) {
    this.submitFormEvent.emit(formValue);
  }
}
