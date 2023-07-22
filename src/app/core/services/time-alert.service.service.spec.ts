import { TestBed } from '@angular/core/testing';

import { TimeAlertServiceService } from './time-alert.service.service';

describe('TimeAlertServiceService', () => {
  let service: TimeAlertServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeAlertServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
