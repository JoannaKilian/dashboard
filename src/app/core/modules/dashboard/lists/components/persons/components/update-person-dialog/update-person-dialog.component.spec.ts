import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePersonDialogComponent } from './update-person-dialog.component';

describe('UpdatePersonsDialogComponent', () => {
  let component: UpdatePersonDialogComponent;
  let fixture: ComponentFixture<UpdatePersonDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePersonDialogComponent]
    });
    fixture = TestBed.createComponent(UpdatePersonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
