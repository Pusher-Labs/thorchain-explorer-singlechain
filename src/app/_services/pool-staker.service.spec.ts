import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PoolStakerService } from './pool-staker.service';

describe('PoolStakerService', () => {
  let service: PoolStakerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(PoolStakerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
