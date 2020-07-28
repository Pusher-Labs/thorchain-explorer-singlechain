import { TestBed } from '@angular/core/testing';

import { StakerService } from './staker.service';

describe('StakerService', () => {
  let service: StakerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StakerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
