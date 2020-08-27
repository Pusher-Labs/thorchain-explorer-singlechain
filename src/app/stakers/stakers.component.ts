import { Component, OnInit, OnDestroy } from '@angular/core';
import { StakerService } from '../_services/staker.service';
import { ThorchainNetworkService } from '../_services/thorchain-network.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stakers',
  templateUrl: './stakers.component.html',
  styleUrls: ['./stakers.component.scss']
})
export class StakersComponent implements OnInit, OnDestroy {

  stakers: string[];
  subs: Subscription[];
  error: string;

  constructor(private stakerService: StakerService, private thorchainNetworkService: ThorchainNetworkService) {
    const network$ = this.thorchainNetworkService.network$.subscribe(
      (_) => {
        this.getStakers();
      }
    );

    this.subs = [network$];
  }

  ngOnInit(): void {
    this.getStakers();
  }

  getStakers(): void {
    this.stakers = null;
    this.error = null;

    this.stakerService.findAll().subscribe(
      (res) => this.stakers = res,
      (err) => {
        console.error('error fetching stakers: ', err);
        this.error = 'Could not fetch stakers';
      }
    );
  }

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

}
