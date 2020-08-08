import { Component, OnInit } from '@angular/core';
import { PoolDetail, PoolService } from 'src/app/_services/pool.service';
import { ActivatedRoute } from '@angular/router';
import { AssetService, Asset } from 'src/app/_services/asset.service';

@Component({
  selector: 'app-pool-details',
  templateUrl: './pool-details.component.html',
  styleUrls: ['./pool-details.component.scss']
})
export class PoolDetailsComponent implements OnInit {

  poolDetail: PoolDetail;
  apy: number;
  asset: Asset;

  constructor(private route: ActivatedRoute, private poolService: PoolService, private assetService: AssetService) { }

  ngOnInit(): void {
    this.route.parent.paramMap.subscribe( async (params) => {

      const poolName = params.get('pool');

      this.getPoolDetails(poolName);
      this.getAsset(poolName);

    });
  }

  async getPoolDetails(poolName: string) {

    this.poolService.details([poolName]).subscribe(
      (res) => {
        if (res.length > 0) {
          this.poolDetail = res[0];
        }
      },
      (err) => console.error('err is: ', err)
    );
  }

  async getAsset(poolName: string) {

    this.assetService.index([poolName]).subscribe(
      (res) => {
        if (res.length > 0) {
          this.asset = res[0];
        }
      },
      (err) => console.error('err is: ', err)
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

}
