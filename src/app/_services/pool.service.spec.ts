import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PoolService } from './pool.service';

describe('PoolService', () => {
  let service: PoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(PoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
