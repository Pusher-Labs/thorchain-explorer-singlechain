import { Component, OnInit, OnDestroy } from '@angular/core';
import { PoolDetail, PoolService } from 'src/app/_services/pool.service';
import { ActivatedRoute } from '@angular/router';
import { AssetService, Asset } from 'src/app/_services/asset.service';
import { ThorchainNetworkService } from 'src/app/_services/thorchain-network.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pool-details',
  templateUrl: './pool-details.component.html',
  styleUrls: ['./pool-details.component.scss']
})
export class PoolDetailsComponent implements OnInit, OnDestroy {

  poolDetail: PoolDetail;
  apy: number;
  asset: Asset;
  poolName: string;
  subs: Subscription[];
  error: boolean;

  constructor(
    private route: ActivatedRoute,
    private poolService: PoolService,
    private assetService: AssetService,
    private thorchainNetworkService: ThorchainNetworkService
  ) {

    const network$ = this.thorchainNetworkService.network$.subscribe(
      (_) => {
        this.fetchData();
      }
    );

    this.subs = [network$];

  }

  ngOnInit(): void {
    const route$ = this.route.parent.paramMap.subscribe( async (params) => {

      this.poolName = params.get('pool');
      console.log('this pool name is: ', this.poolName);

      this.fetchData();

    });
    this.subs.push(route$);
  }

  async getPoolDetails() {

    this.poolService.details([this.poolName]).subscribe(
      (res) => {
        if (res.length > 0) {
          this.poolDetail = res[0];
        }
      },
      (err) => {
        console.error('err is: ', err);
        this.error = true;
      }
    );
  }

  fetchData() {
    if (this.poolName) {
      console.log('fetch data called with pool name: ', this.poolName);
      this.poolDetail = null;
      this.error = false;
      this.getPoolDetails();
      this.getAsset();
    } else {
      console.log('no poolname set');
    }
  }

  async getAsset() {

    this.assetService.index([this.poolName]).subscribe(
      (res) => {
        if (res.length > 0) {
          this.asset = res[0];
        }
      },
      (err) => {
        console.error('err is: ', err);
        this.error = true;
      }
    );
  }

  setAPY(roi: string): number {

    if (this.asset) {
      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
      const now = Date.now();
      const diffInDays = Math.floor((now - (this.asset.dateCreated * 1000)) / _MS_PER_DAY);
      const apy = (Number(roi) * 365) / diffInDays;
      return apy;
    }

    console.error('no asset set in APY');

    return null;

  }

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

}
