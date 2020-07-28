import { Component, OnInit } from '@angular/core';
import { PoolDetail, PoolService } from 'src/app/_services/pool.service';
import { ActivatedRoute } from '@angular/router';
import midgard from '@thorchain/asgardex-midgard';

@Component({
  selector: 'app-pool-details',
  templateUrl: './pool-details.component.html',
  styleUrls: ['./pool-details.component.scss']
})
export class PoolDetailsComponent implements OnInit {

  poolDetail: PoolDetail;

  constructor(private route: ActivatedRoute, private poolService: PoolService) { }

  ngOnInit(): void {
    this.route.parent.paramMap.subscribe( async (params) => {

      const poolName = params.get('pool');

      this.getPoolDetails(poolName);

    });
  }

  async getPoolDetails(poolName: string) {
    const baseUrl = await midgard();

    this.poolService.details(baseUrl, [poolName]).subscribe(
      (res) => {
        if (res.length > 0) {
          this.poolDetail = res[0];
        }
      },
      (err) => console.error('err is: ', err)
    );
  }

}
