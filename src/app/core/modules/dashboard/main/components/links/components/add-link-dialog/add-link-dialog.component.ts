import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { Link } from 'src/app/core/models/links.models';
import { LinksService } from 'src/app/core/services/links.service';
import { TimeAlertService } from 'src/app/core/services/time-alert.service';


@Component({
  selector: 'app-add-link-dialog',
  templateUrl: './add-link-dialog.component.html',
  styleUrls: ['./add-link-dialog.component.scss']
})
export class AddLinkDialogComponent implements OnInit {

  title: EntityCategory;
  newItem: Link;

  constructor(
    public dialogRef: MatDialogRef<AddLinkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dataService: LinksService,
  ) { }

  ngOnInit() {
    this.title = this.dialogData.title;
  }

  addHandler(item: Link) {
    const id: string = this.dataService.addUniqueId();
    item.id = id;
    this.newItem = item

    this.dataService.add(this.newItem);
  }
}
