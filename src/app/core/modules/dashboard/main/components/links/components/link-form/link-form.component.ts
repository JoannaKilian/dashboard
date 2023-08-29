import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormConfig } from 'src/app/core/models/form-config.models';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { Link } from 'src/app/core/models/links.models';
import { UpdateLinkDialogComponent } from '../update-link-dialog/update-link-dialog.component';
import { LinksService } from 'src/app/core/services/links.service';


@Component({
  selector: 'app-link-form',
  templateUrl: './link-form.component.html',
  styleUrls: ['./link-form.component.scss']
})
export class LinkFormComponent  implements OnInit {

  @Input() data: Link;
  @Input() title: EntityCategory;
  @Output() submitFormEvent: EventEmitter<Link> = new EventEmitter();

  formFields: FormConfig[];

  constructor(
    public dialogRef: MatDialogRef<UpdateLinkDialogComponent>,
    private dataService: LinksService
  ) { }

  ngOnInit(): void {
    this.formFields = this.dataService.getFormFields();
  }

  closeHandler(): void {
    this.dialogRef.close();
  }

  submitHandler(formValue: Link) {
    this.submitFormEvent.emit(formValue);
  }
}
