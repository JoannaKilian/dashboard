import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCarDialogComponent } from './update-car-dialog.component';

describe('UpdateCarDialogComponent', () => {
  let component: UpdateCarDialogComponent;
  let fixture: ComponentFixture<UpdateCarDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCarDialogComponent]
    });
    fixture = TestBed.createComponent(UpdateCarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
