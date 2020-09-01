import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CoinGeckoService } from './coingecko.service';

describe('CoingeckoService', () => {
  let service: CoinGeckoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CoinGeckoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
