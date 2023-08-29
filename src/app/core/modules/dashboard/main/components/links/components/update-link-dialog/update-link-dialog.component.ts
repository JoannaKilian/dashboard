import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { Link } from 'src/app/core/models/links.models';
import { LinksService } from 'src/app/core/services/links.service';


@Component({
  selector: 'app-update-link-dialog',
  templateUrl: './update-link-dialog.component.html',
  styleUrls: ['./update-link-dialog.component.scss']
})
export class UpdateLinkDialogComponent implements OnInit {

  title: EntityCategory;
  link: Link;

  constructor(
    public dialogRef: MatDialogRef<UpdateLinkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dataService: LinksService,
  ) { }

  ngOnInit() {
    this.title = this.dialogData.title;
    this.link = this.dialogData.link;
  }

  updateHandler(updateItem: Link) {
    updateItem.id = this.link.id;
    this.dataService.update(updateItem);
  }
}
