import { Component, Input, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  @Input() days: number;
  @Input() title: string;

  progressValue: number;
  mode: ProgressSpinnerMode = 'determinate';
  alert: boolean;

  ngOnInit(){
    this.alert = this.days > 30 ? false : true;
    this.progressValue = this.days/365 * 100
  }
}
