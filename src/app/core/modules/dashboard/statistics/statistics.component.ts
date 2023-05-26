import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StatisticsComponent implements OnInit, AfterViewInit  {

  dataSource = new MatTableDataSource<ProjectData>(data);
  columnsToDisplay = ['name', 'followers', 'createDate', 'createdBy'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: ProjectData | null;

  @ViewChild(MatSort) sort: MatSort;
  //
  // dataSource = new MatTableDataSource<any>([]);
  // visibleData: ProjectData[] = [];
  // columnsToDisplay = ['name', 'followers', 'createDate', 'createdBy'];
  // columnsToDisplayWithExpand = ['expand', ...this.columnsToDisplay, 'options'];
  // expandedElement: any;
  // nativeSortEvent: Sort;
  //
  totalCount: number;
  // pagination = {
  //   page: 0,
  //   pageSize: 5,
  // };
  //

  ngOnInit(): void {
    this.totalCount = data.length;
    // // this.loadDataForCurrentPage();
    // this.dataSource = new MatTableDataSource<any>(this.data);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  //
  // loadDataForCurrentPage() {
  //   console.log('load, this.pagination', this.pagination)
  //   const startIndex = (this.pagination.page - 1) * this.pagination.pageSize;
  //   const endIndex = startIndex + this.pagination.pageSize;
  //   this.visibleData = this.data.slice(startIndex, endIndex);
  //   this.dataSource = new MatTableDataSource<any>(this.visibleData);
  // }
}


export interface ProjectData {
  id: string;
  name: string;
  followers: number;
  stars: number;
  statusColor: string;
  createDate: string;
  createdBy: string;

}

const data : ProjectData[] = [
  { id: '01', createdBy: 'John', followers: 345, statusColor: '#F8B04A', createDate: '10:00 AM', stars: 5, name: 'AAA'},
  { id: '02', createdBy: 'Anna', followers: 33, statusColor: '#F8B04A', createDate: '10:00 AM', stars: 4, name: 'BBB'},
  { id: '03', createdBy: 'Piter', followers: 543, statusColor: '#F8B04A', createDate: '10:00 AM', stars: 6, name: 'CCC'},
  { id: '04', createdBy: 'Alice', followers: 67, statusColor: '#F8B04A', createDate: '10:00 AM', stars: 7, name: 'DDD'},
  { id: '05', createdBy: 'Mark', followers: 677, statusColor: '#F8B04A', createDate: '10:00 AM', stars: 8, name: 'EEE'},
  { id: '06', createdBy: 'John', followers: 345, statusColor: '#F8B04A', createDate: '10:00 AM', stars: 5, name: 'FFF'},
  { id: '07', createdBy: 'Anna', followers: 33, statusColor: '#F8B04A', createDate: '10:00 AM', stars: 4, name: 'GGG'},
  { id: '08', createdBy: 'Piter', followers: 543, statusColor: '#F8B04A', createDate: '10:00 AM', stars: 6, name: 'HHH'},
  { id: '09', createdBy: 'Alice', followers: 67, statusColor: '#F8B04A', createDate: '10:00 AM', stars: 7, name: 'III'},
  { id: '10', createdBy: 'Mark', followers: 677, statusColor: '#F8B04A', createDate: '10:00 AM', stars: 8, name: 'JJJ'},
    ];

