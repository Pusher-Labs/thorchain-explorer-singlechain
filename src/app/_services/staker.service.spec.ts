import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StakerService } from './staker.service';

describe('StakerService', () => {
  let service: StakerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(StakerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
