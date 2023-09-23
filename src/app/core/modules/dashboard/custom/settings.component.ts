import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Section } from 'src/app/core/models/sections.models';
import { ColorService } from 'src/app/core/services/color.service';
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

  max = 60;
  min = 10;
  showTicks = true;
  step = 10;
  thumbLabel = true;
  value = 30;

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
  ) {
  }

  ngOnInit() {
    this.menuService.setCurrentIndex(2);
    this.colorService.setColor();
    this.colorService.color$.subscribe(data => {
      this.activeIndexColor = data
    })
    this.menuService.getSections();
    this.sections$ = this.menuService.sections$;
  }

  changeColor(i: number) {
    this.activeIndexColor = i;
    this.colorService.changeColor(i);
  }

  changeAlertTime(i: number){
    
  }

  updateSections(index: number, isVisibly: boolean){
    this.menuService.updateSections(index, isVisibly);
  }

  defaultSection(){
    this.menuService.defautl()
  }
}
