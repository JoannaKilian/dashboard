import { AfterViewInit, ChangeDetectorRef, Component, ContentChild, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { TimeAlertService } from 'src/app/core/services/time-alert.service.service';
import { Subscription, filter } from 'rxjs';
import { Alert } from 'src/app/core/models/alert.models';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableComponent implements OnInit, AfterViewInit {

  @Input() dataTable: any[];
  @Input() columnsToDisplay: string[];
  @Input() title: "Persons" | "Cars" | "Pets";
  @Input() icon: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ContentChild('detailsTemplate', { static: true })
  detailsTemplate!: TemplateRef<any>;

  dataSource: MatTableDataSource<any>;
  expandedElement: any | null;
  columnsToDisplayWithExpand: string[];
  totalCount: number;
  alerts: Alert[];
  private subscription: Subscription;

  constructor(
    private timeAlertService: TimeAlertService,
    private changeDetectorRef: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    this.columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
    this.dataSource = new MatTableDataSource(this.dataTable);
    this.totalCount = this.dataTable.length;
    this.subscription = this.timeAlertService.timeAlert$
    .subscribe((data: Alert[]) => {
      this.alerts = data.filter(alert => alert.category === this.title);
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.changeDetectorRef.detectChanges();
    
  }

  getColumnName(name: string): string{
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  onAddClick() {
    console.log('add');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

