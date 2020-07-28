import { Component, OnInit } from '@angular/core';
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

    this.stakerService.findAll().subscribe(
      (res) => this.stakers = res,
      (err) => console.error('error fetching stakers: ', err)
    );
  }

  async getGlobalStats() {

    this.statsService.getStats().subscribe(
      (res) => this.stats = res,
      (err) => console.error(err)
    );

  }

  async getPools() {

    this.poolService.index().subscribe(
      (res) => this.pools = res,
      (err) => console.error(err)
    );
  }

}
