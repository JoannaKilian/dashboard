import { Component, Input, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { of, switchMap, take } from 'rxjs';
import { DaysAlertService } from 'src/app/core/services/days-alert.service';

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
  daysAlerts: number;

  constructor(
    private daysAlertService: DaysAlertService,
  ) { };

  ngOnInit() {
    this.daysAlerts = this.daysAlertService.getDaysAlerts();
    this.alert = this.days > this.daysAlerts ? false : true;
    this.progressValue = this.days / 365 * 100
  }
}
