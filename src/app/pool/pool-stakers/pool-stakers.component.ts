import { Component, OnInit, OnDestroy } from '@angular/core';
import { PoolStaker } from 'src/app/_classes/pool-staker';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PoolStakerService } from 'src/app/_services/pool-staker.service';
import { Subscription } from 'rxjs';
import { ThorchainNetworkService } from 'src/app/_services/thorchain-network.service';

@Component({
  selector: 'app-pool-stakers',
  templateUrl: './pool-stakers.component.html',
  styleUrls: ['./pool-stakers.component.scss']
})
export class PoolStakersComponent implements OnInit, OnDestroy {

  stakers: PoolStaker[];
  totalCount: number;
  poolName: string;
  subs: Subscription[];

  constructor(
    private route: ActivatedRoute,
    private poolStakerService: PoolStakerService,
    private router: Router,
    private thorchainNetworkService: ThorchainNetworkService) {
      const network$ = this.thorchainNetworkService.networkUpdated$.subscribe(
        (_) => {

          this.stakers = null;
          this.getAssetStakers();

        }
      );

      this.subs = [network$];

  }

  ngOnInit(): void {

    const params$ = this.route.parent.paramMap.subscribe( async (params) => {
      this.poolName = params.get('pool');
      this.getAssetStakers();
    });

    this.subs.push(params$);

  }

  async getAssetStakers() {
    this.poolStakerService.findAll(this.poolName).subscribe(
      (res) => {
        this.stakers = res;
      },
      (err) => console.error('err is: ', err)
    );
  }

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

}
