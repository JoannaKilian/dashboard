import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Section } from 'src/app/core/models/sections.models';
import { ColorService } from 'src/app/core/services/color.service';
import { DaysAlertService } from 'src/app/core/services/days-alert.service';
import { MenuService } from 'src/app/core/services/menu.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  activeIndexColor: number = 1;
  sections$: Observable<Section[]>;
  color$: Observable<number>;

  max: number = 60;
  min: number = 10;
  showTicks: boolean = true;
  step: number = 10;
  thumbLabel: boolean = true;
  value: number;

  colors = [
    { title: 'dark', color: '#444444' },
    { title: 'blue', color: '#1B6B93' },
    { title: 'purple', color: '#603F83' },
    { title: 'green', color: '#60CC99' },
    { title: 'light', color: '#dddddd' },
  ];

  constructor(
    private colorService: ColorService,
    private menuService: MenuService,
    private daysAlertService: DaysAlertService,
  ) {
  }

  ngOnInit() {
    this.menuService.setCurrentIndex(2);
    this.colorService.setColor();
    this.colorService.color$.subscribe(data => {
      this.activeIndexColor = data
    })
    this.daysAlertService.setDaysAlert();
    this.daysAlertService.daysAlert$.subscribe(data => {
      this.value = data
    })
    this.menuService.getSections();
    this.sections$ = this.menuService.sections$;
  }

  changeColor(i: number) {
    this.activeIndexColor = i;
    this.colorService.changeColor(i);
  }

  changeAlertTime(i: number){
    this.value = i;
    this.daysAlertService.changeDaysAlert(i)
  }

  updateSections(index: number, isVisibly: boolean){
    this.menuService.updateSections(index, isVisibly);
  }

  defaultSection(){
    this.menuService.defautl()
  }

  setAlertTime(){
    this.changeAlertTime(this.value)
  }
}
