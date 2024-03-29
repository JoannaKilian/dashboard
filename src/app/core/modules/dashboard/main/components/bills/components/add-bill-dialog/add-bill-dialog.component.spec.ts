import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBillDialogComponent } from './add-bill-dialog.component';

describe('AddBillDialogComponent', () => {
  let component: AddBillDialogComponent;
  let fixture: ComponentFixture<AddBillDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBillDialogComponent]
    });
    fixture = TestBed.createComponent(AddBillDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
