import { Component } from '@angular/core';
import { ColorService } from 'src/app/core/services/color.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  activeIndexColor: number = 0;

  colors = [
    { title: 'light', value: 0, color: '#eeeeee' },
    { title: 'dark', value: 1, color: '#111111' },
    { title: 'blue', value: 2, color: '#1B6B93' },
    { title: 'purple', value: 3, color: '#603F83' },
    { title: 'green', value: 3, color: '#60CC99' },
  ];

  constructor(    
    private colorService: ColorService
    ){
  }

  changeColor(i: number) {
    this.activeIndexColor = i;
    this.colorService.changeColor(i);
    
  }
}
