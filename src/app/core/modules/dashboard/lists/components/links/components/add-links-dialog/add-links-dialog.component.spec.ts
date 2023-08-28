import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLinksDialogComponent } from './add-links-dialog.component';

describe('AddLinksDialogComponent', () => {
  let component: AddLinksDialogComponent;
  let fixture: ComponentFixture<AddLinksDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLinksDialogComponent]
    });
    fixture = TestBed.createComponent(AddLinksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
