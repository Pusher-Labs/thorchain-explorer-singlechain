import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Staker } from '../_classes/staker';
import { StakerService } from '../_services/staker.service';
import { StakerPoolData } from '../_classes/staker-pool-data';
import { ThorchainNetworkService } from '../_services/thorchain-network.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-staker',
  templateUrl: './staker.component.html',
  styleUrls: ['./staker.component.scss']
})
export class StakerComponent implements OnInit {

  staker: Staker;
  address: string;
  stakerPoolsData: StakerPoolData[];
  subs: Subscription[];
  error: string;

  constructor(
    private route: ActivatedRoute,
    private stakerService: StakerService,
    private thorchainNetworkService: ThorchainNetworkService) {
      const network$ = this.thorchainNetworkService.networkUpdated$.subscribe(
        (_) => {
          if (this.address) {
            this.fetchStaker(this.address);
          }
        }
      );

      this.subs = [network$];
    }

  ngOnInit(): void {

    this.route.paramMap.subscribe( (params) => {

      this.address = params.get('address');

      if (this.address) {
        this.fetchStaker(this.address);
      }

    });

  }

  fetchStaker(address: string) {
    this.staker = null;
    this.error = null;

    this.stakerService.findOne(address).subscribe(
      (res) => {
        this.staker = new Staker(res);
        if (this.staker && this.staker.poolsArray) {
          console.log('this staker pools array is: ', this.staker.poolsArray);
          this.fetchPoolsData(address, this.staker.poolsArray);
        } else {
          this.error = 'Could not find staker pools';
        }
      },
      (err) => {
        console.error('error finding staker: ', err);
        this.error = 'Error fetching staker';
      }
    );

  }

  fetchPoolsData(address: string, pools: string[]) {

    this.stakerService.findStakerPoolData(address, pools).subscribe(
      (res) => this.stakerPoolsData = res,
      (err) => {
        console.error('error finding staker: ', err);
        this.error = 'Error fetching pools data';
      }
    );
  }

}
