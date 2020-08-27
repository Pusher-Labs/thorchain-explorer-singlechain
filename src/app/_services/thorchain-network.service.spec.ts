import { TestBed } from '@angular/core/testing';

import { ThorchainNetworkService } from './thorchain-network.service';

describe('ThorchainNetworkService', () => {
  let service: ThorchainNetworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThorchainNetworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
