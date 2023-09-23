import { AfterViewInit, ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { EntityAlertMap, EntityCategory } from 'src/app/core/models/category-list.models';
import { Observable, Subscription, map } from 'rxjs';
import { AlertsService } from 'src/app/core/services/alerts.service';

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
export class TableComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @Input() data$: Observable<any[]>;
  @Input() columnsToDisplay: string[];
  @Input() title: EntityCategory;
  @Input() icon: string;

  @Output() addEvent = new EventEmitter;
  @Output() editEvent = new EventEmitter<any>;
  @Output() deleteEvent = new EventEmitter<any>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ContentChild('detailsTemplate', { static: true })
  detailsTemplate!: TemplateRef<any>;
  dataTable: any[];

  dataSource: MatTableDataSource<any>;
  expandedElement: any | null;
  columnsToDisplayWithExpand: string[];
  totalCount: number;
  loading: boolean = true;
  alerts$: Observable<EntityAlertMap>;

  subscription: Subscription = new Subscription();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private alertsService: AlertsService
  ) { }

  ngOnInit(): void {
    this.subscription.add(this.data$.subscribe(data => {
      this.dataTable = data;
      this.columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand', 'edit', 'delete'];
      this.dataSource = new MatTableDataSource(this.dataTable);
      this.totalCount = this.dataTable.length;
      this.loading = false;
      this.alerts$ = this.alertsService.allAlerts$.pipe(
        map(alerts => {
          alerts[this.title].sort((a, b) => a.deadline - b.deadline);
          return alerts;
        }
        )
      )
    }));
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.changeDetectorRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataTable'] && !changes['dataTable'].firstChange) {
      this.dataSource = new MatTableDataSource(this.dataTable);
      this.totalCount = this.dataTable.length;
    }
  }

  getColumnName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  onAddClick() {
    this.addEvent.emit();
  }

  onEditClick(item: any) {
    this.editEvent.emit(item)
  }

  onDeleteClick(rowElement: any) {
    this.deleteEvent.emit(rowElement)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

