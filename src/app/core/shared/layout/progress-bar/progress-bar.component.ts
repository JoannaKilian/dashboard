import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit{

  @Input() value: number;
  @Input() maxValue: number;
  @Input() name: string;

  progress: number;

  ngOnInit(): void {
    if(this.value > 0){
      this.progress = (this.value / this.maxValue) * 100;
    }
    console.log( this.value,  this.maxValue, this.progress )
  }

  getColor(progress: number): string {
    if (progress < 50) {
      return 'red';
    } else {
      return 'green';
    }
  }

  editDialog(){

  }

  deleteDialog(){

  }
  
}

