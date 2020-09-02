import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LastBlockService } from './last-block.service';

describe('LastBlockService', () => {
  let service: LastBlockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(LastBlockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
