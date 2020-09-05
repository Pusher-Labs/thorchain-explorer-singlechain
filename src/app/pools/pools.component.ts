import { Component, OnInit, OnDestroy } from '@angular/core';
import { PoolService } from '../_services/pool.service';
import { ThorchainNetworkService } from '../_services/thorchain-network.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pools',
  templateUrl: './pools.component.html',
  styleUrls: ['./pools.component.scss']
})
export class PoolsComponent implements OnInit, OnDestroy {

  pools: string[];
  networkSub: Subscription;
  error: string;

  constructor(private poolService: PoolService, private thorchainNetworkService: ThorchainNetworkService) {
    this.networkSub = this.thorchainNetworkService.networkUpdated$.subscribe(
      (_) => {
        this.pools = null;
        this.getAssetPools();
      }
    );
  }

  ngOnInit(): void {
    this.getAssetPools();
  }

  getAssetPools(): void {
    this.error = null;
    this.poolService.index().subscribe(
      (res) => this.pools = res,
      (err) => {
        console.error(err);
        this.error = 'Error Connecting to THORChain';
      }
    );
  }

  ngOnDestroy() {
    this.networkSub.unsubscribe();
  }

}
