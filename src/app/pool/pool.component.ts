import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetService, Asset } from '../_services/asset.service';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.scss']
})
export class PoolComponent implements OnInit {

  asset: Asset;

  constructor(private route: ActivatedRoute, private assetService: AssetService) { }

  async ngOnInit(): Promise<void> {

    this.route.paramMap.subscribe( async (params) => {

      const poolName = params.get('pool');

      this.getAsset(poolName);

    });

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

}
