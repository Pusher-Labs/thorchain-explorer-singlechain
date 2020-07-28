import { Component, OnInit } from '@angular/core';
import midgard from '@thorchain/asgardex-midgard';
import { StakerService } from './_services/staker.service';
import { StatsService, GlobalStats } from './_services/stats.service';
import { PoolService } from './_services/pool.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  stakers: string[];
  pools: string[];
  stats: GlobalStats;

  constructor(private stakerService: StakerService, private statsService: StatsService, private poolService: PoolService) { }

  async ngOnInit() {
    this.getPools();
    this.getStakers();
    this.getGlobalStats();
  }


  async getStakers() {

    const baseUrl = await midgard();

    this.stakerService.findAll(baseUrl).subscribe(
      (res) => this.stakers = res,
      (err) => console.error('error fetching stakers: ', err)
    );
  }

  async getGlobalStats() {
    const baseUrl = await midgard();

    this.statsService.getStats(baseUrl).subscribe(
      (res) => this.stats = res,
      (err) => console.error(err)
    );

  }

  async getPools() {
    const baseUrl = await midgard();

    this.poolService.index(baseUrl).subscribe(
      (res) => this.pools = res,
      (err) => console.error(err)
    );
  }

}
