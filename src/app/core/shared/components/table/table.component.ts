import {AfterViewInit, Component, ContentChild, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableComponent implements OnInit, AfterViewInit  {

  @Input() dataTable: any[];
  @Input() columnsToDisplay: string[];
  @Input() title: string;
  @Input() icon: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ContentChild('detailsTemplate', { static: true })
  detailsTemplate!: TemplateRef<any>;

  dataSource: MatTableDataSource<any>;
  expandedElement: any | null;
  columnsToDisplayWithExpand: string[];
  totalCount: number;
  totalFollowers: number;


  ngOnInit(): void {
    this.columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
    this.dataSource = new MatTableDataSource(this.dataTable);
    this.totalCount = this.dataTable.length;
    this.totalFollowers = this.dataTable.reduce((total, project) => total + project.followers, 0);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onAddClick(){
    console.log('add');
  }
}

