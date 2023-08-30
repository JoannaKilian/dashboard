import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBillDialogComponent } from './update-bill-dialog.component';

describe('UpdateBillDialogComponent', () => {
  let component: UpdateBillDialogComponent;
  let fixture: ComponentFixture<UpdateBillDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateBillDialogComponent]
    });
    fixture = TestBed.createComponent(UpdateBillDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
