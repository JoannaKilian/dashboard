import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.html',
  styleUrls: ['./stars.scss']
})
export class Stars implements OnInit {
  @Input() numberAll: number = 10;
  @Input() range: number = 1;

  numberEmptyArray: unknown[] = [];
  numberRangeArray: unknown[] = []

  ngOnInit() {
    this.numberRangeArray = new Array(this.range)
    this.numberEmptyArray = new Array(this.numberAll - this.range);
  }

}
