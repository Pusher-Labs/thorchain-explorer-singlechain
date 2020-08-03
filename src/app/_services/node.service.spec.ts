import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NodeService } from './node.service';

describe('NodeService', () => {
  let service: NodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(NodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
