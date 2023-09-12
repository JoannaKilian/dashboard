import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarticalMenuComponent } from './vartical-menu.component';

describe('MenuComponent', () => {
  let component: VarticalMenuComponent;
  let fixture: ComponentFixture<VarticalMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VarticalMenuComponent]
    });
    fixture = TestBed.createComponent(VarticalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
