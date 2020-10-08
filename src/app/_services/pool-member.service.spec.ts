import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PoolMemberService } from './pool-member.service';

describe('PoolMemberService', () => {
  let service: PoolMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(PoolMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
