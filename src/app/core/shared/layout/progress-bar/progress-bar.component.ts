import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimeAlertService } from 'src/app/core/services/time-alert.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit{

  @Input() date: string;
  @Input() maxValue: number;
  @Input() name: string;

  @Output() editClick = new EventEmitter<void>();
  @Output() deleteClick = new EventEmitter<void>();
  @Output() paidClick = new EventEmitter<void>();

  progress: number;
  value: number;

  constructor(
    private timeAlertService: TimeAlertService,
  ) { }

  ngOnInit(): void {
    this.value = this.timeAlertService.getCountEndTime(this.date);
    if(this.value > 0){
      this.progress = (this.value / this.maxValue) * 100;
    }
  }

  getColor(progress: number): string {
    if (progress < 33) {
      return 'var(--color-alert)';
    } else {
      return 'var(--color-ok)';
    }
  }

  onEditClick(){
    this.editClick.emit();
  }

  onDeleteClick(){
    this.deleteClick.emit();
  }

  onPaidClick(){
    this.paidClick.emit();
  }

  addDialog(){

  }
  
}

