import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Stars } from './stars';

describe('ComingSoonComponent', () => {
  let component: Stars;
  let fixture: ComponentFixture<Stars>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Stars]
    });
    fixture = TestBed.createComponent(Stars);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
