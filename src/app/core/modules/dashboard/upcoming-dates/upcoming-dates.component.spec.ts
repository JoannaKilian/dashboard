import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingDatesComponent } from './upcoming-dates.component';

describe('UpcomingDatesComponent', () => {
  let component: UpcomingDatesComponent;
  let fixture: ComponentFixture<UpcomingDatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpcomingDatesComponent]
    });
    fixture = TestBed.createComponent(UpcomingDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
