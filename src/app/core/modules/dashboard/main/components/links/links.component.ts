import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Link } from 'src/app/core/models/links.models';
import { LinksService } from 'src/app/core/services/links.service';
import { AddLinkDialogComponent } from './components/add-link-dialog/add-link-dialog.component';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { UpdateLinkDialogComponent } from './components/update-link-dialog/update-link-dialog.component';
import { InfoDialogComponent } from 'src/app/core/shared/components/info-dialog/info-dialog/info-dialog.component';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit, OnDestroy {

  data$: Observable<Link[]>;
  title: EntityCategory;
  subscription: Subscription = new Subscription();

  constructor(
    private dataService: LinksService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.title = "links";
    this.dataService.getList();
    this.data$ = this.dataService.data$;
  }

  addDialog() {
    this.dialog.open(AddLinkDialogComponent, {
      width: '500px',
      data: {
        title: this.title,
      }
    });
  }

  editDialog(link: Link) {
    this.dialog.open(UpdateLinkDialogComponent, {
      width: '500px',
      data: {
        title: this.title,
        link: link,
      }
    });
  }

  deleteDialog(item: Link) {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: {
        title: `Delete ${item.name}`,
        description: `Are you sure you want to delete ${item.name} link`,
        type: 'submit'
      }
    });
    this.subscription.add(dialogRef.afterClosed().subscribe((result) => {
      if (result === 'submit') {
        this.dataService.delete(item);
      }
    }))
  }

  getIcon(category: string): string {
    return this.dataService.getIcon(category)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}