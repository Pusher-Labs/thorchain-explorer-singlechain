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

  constructor(private poolService: PoolService, private thorchainNetworkService: ThorchainNetworkService) {
    this.networkSub = this.thorchainNetworkService.network$.subscribe(
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
    this.poolService.index().subscribe(
      (res) => this.pools = res,
      (err) => console.error(err)
    );
  }

  ngOnDestroy() {
    this.networkSub.unsubscribe();
  }

}
