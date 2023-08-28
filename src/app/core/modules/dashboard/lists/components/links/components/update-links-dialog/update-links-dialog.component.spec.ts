import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLinksDialogComponent } from './update-links-dialog.component';

describe('UpdateLinksDialogComponent', () => {
  let component: UpdateLinksDialogComponent;
  let fixture: ComponentFixture<UpdateLinksDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateLinksDialogComponent]
    });
    fixture = TestBed.createComponent(UpdateLinksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
