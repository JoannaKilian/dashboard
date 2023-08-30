import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Bill } from 'src/app/core/models/bills.models';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { BillsService } from 'src/app/core/services/bills.service';

@Component({
  selector: 'app-update-bill-dialog',
  templateUrl: './update-bill-dialog.component.html',
  styleUrls: ['./update-bill-dialog.component.scss']
})
export class UpdateBillDialogComponent implements OnInit {

  title: EntityCategory;
  bill: Bill;

  constructor(
    public dialogRef: MatDialogRef<UpdateBillDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dataService: BillsService,
  ) { }

  ngOnInit() {
    this.title = this.dialogData.title;
    this.bill = this.dialogData.bill;
  }

  updateHandler(updateItem: Bill) {
    updateItem.id = this.bill.id;
    this.dataService.update(updateItem);
  }
}
