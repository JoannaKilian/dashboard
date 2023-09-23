import { Component, Input, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { of, switchMap } from 'rxjs';
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
  daysAlertValue: number;

  constructor(
    private daysAlertService: DaysAlertService,
  ) {
    daysAlertService.daysAlert$.subscribe(data => {
      this.daysAlertValue = data
    })
  };

  ngOnInit() {
    if (this.daysAlertValue !== undefined) {
      this.alert = this.days > this.daysAlertValue ? false : true;
    } else {
      this.daysAlertService.daysAlert$
        .pipe(
          switchMap(day => {
            this.alert = this.days > day ? false : true;
            return of(null);
          })
        ).subscribe()
    }
    this.progressValue = this.days / 365 * 100
  }
}
