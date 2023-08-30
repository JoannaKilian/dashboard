import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Bill } from 'src/app/core/models/bills.models';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { BillsService } from 'src/app/core/services/bills.service';

@Component({
  selector: 'app-add-bill-dialog',
  templateUrl: './add-bill-dialog.component.html',
  styleUrls: ['./add-bill-dialog.component.scss']
})
export class AddBillDialogComponent  implements OnInit {

  
  title: EntityCategory;
  newItem: Bill;


  constructor(
    public dialogRef: MatDialogRef<AddBillDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dataService: BillsService,
  ) { }

  ngOnInit() {
    this.title = this.dialogData.title;
  }

  addHandler(item: Bill) {
    const id: string = this.dataService.addUniqueId();
    item.id = id;
    this.newItem = item

    this.dataService.add(this.newItem);
  }

}
