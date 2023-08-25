import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePetDialogComponent } from './update-pet-dialog.component';

describe('UpdatePetDialogComponent', () => {
  let component: UpdatePetDialogComponent;
  let fixture: ComponentFixture<UpdatePetDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePetDialogComponent]
    });
    fixture = TestBed.createComponent(UpdatePetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
