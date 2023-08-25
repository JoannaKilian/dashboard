import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPetDialogComponent } from './add-pet-dialog.component';

describe('AddPetDialogComponent', () => {
  let component: AddPetDialogComponent;
  let fixture: ComponentFixture<AddPetDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPetDialogComponent]
    });
    fixture = TestBed.createComponent(AddPetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
