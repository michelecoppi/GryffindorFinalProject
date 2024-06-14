import { TestBed } from '@angular/core/testing';

import { SmokingService } from './smoking.service';

describe('SmokingService', () => {
  let service: SmokingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmokingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
