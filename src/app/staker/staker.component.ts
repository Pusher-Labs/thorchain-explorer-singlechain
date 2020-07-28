import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import midgard from '@thorchain/asgardex-midgard';
import { Staker } from '../_classes/staker';
import { StakerService } from '../_services/staker.service';
import { StakerPoolData } from '../_classes/staker-pool-data';

@Component({
  selector: 'app-staker',
  templateUrl: './staker.component.html',
  styleUrls: ['./staker.component.scss']
})
export class StakerComponent implements OnInit {

  staker: Staker;
  address: string;
  stakerPoolsData: StakerPoolData[];

  constructor(private route: ActivatedRoute, private stakerService: StakerService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe( (params) => {

      this.address = params.get('address');

      if (this.address) {
        this.fetchStaker(this.address);
      }

    });

  }

  async fetchStaker(address: string) {

    const baseUrl = await midgard();

    this.stakerService.findOne(baseUrl, address).subscribe(
      (res) => {
        this.staker = new Staker(res);
        if (this.staker) {
          this.fetchPoolsData(address, this.staker.poolsArray);
        }
      },
      (err) => console.error('error finding staker: ', err)
    );

  }

  async fetchPoolsData(address: string, pools: string[]) {

    const baseUrl = await midgard();

    this.stakerService.findStakerPoolData(baseUrl, address, pools).subscribe(
      (res) => this.stakerPoolsData = res,
      (err) => console.error('error finding staker: ', err)
    );
  }

}
