import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { EntityCategory, SectionNumber } from 'src/app/core/models/category-list.models';
import { Link } from 'src/app/core/models/links.models';
import { Section } from 'src/app/core/models/sections.models';
import { LinksService } from 'src/app/core/services/links.service';
import { MenuService } from 'src/app/core/services/menu.service';
import { AddLinksDialogComponent } from './components/add-links-dialog/add-links-dialog.component';
import { UpdateLinksDialogComponent } from './components/update-links-dialog/update-links-dialog.component';
import { InfoDialogComponent } from 'src/app/core/shared/components/info-dialog/info-dialog/info-dialog.component';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit, OnDestroy {

  data$: Observable<Link[]>;
  title: EntityCategory;
  icon: string;
  sections: Section[];
  headers: string[] = ['name', 'url', 'login'];
  subscription: Subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private menuService: MenuService,
    private dataService: LinksService,
  ) { }

  ngOnInit(): void {
    this.getSectionInfo(SectionNumber.Persons);
    this.dataService.getList();
    this.data$ = this.dataService.data$;
  }

  getSectionInfo(index: number){
    this.sections = this.menuService.getSections();
    this.title = this.sections[index].title;
    const foundedSection = this.sections.find(section => section.title === this.title);
    if(foundedSection){
      this.icon = foundedSection.icon;
    }
  }

  addDialog() {
    this.dialog.open(AddLinksDialogComponent, {
      width: '500px',
      data: {
        title: this.title,
      }
    });
  }

  editDialog(person: Link) {
    this.dialog.open(UpdateLinksDialogComponent, {
      width: '500px',
      data: {
        title: this.title,
        person: person,
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
