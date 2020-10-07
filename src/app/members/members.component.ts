import { Component, OnInit, OnDestroy } from '@angular/core';
import { StakerService } from '../_services/staker.service';
import { ThorchainNetworkService } from '../_services/thorchain-network.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class StakersComponent implements OnInit, OnDestroy {

  members: string[];
  subs: Subscription[];
  error: string;

  constructor(private stakerService: StakerService, private thorchainNetworkService: ThorchainNetworkService) {
    const network$ = this.thorchainNetworkService.networkUpdated$.subscribe(
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
    this.members = null;
    this.error = null;

    this.stakerService.findAll().subscribe(
      (res) => this.members = res,
      (err) => {
        console.error('error fetching members: ', err);
        this.error = 'Could not fetch members';
      }
    );
  }

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

}
