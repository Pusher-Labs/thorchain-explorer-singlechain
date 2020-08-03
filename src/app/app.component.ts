import { Component, OnInit } from '@angular/core';
import { StakerService } from './_services/staker.service';
import { StatsService, GlobalStats } from './_services/stats.service';
import { PoolService } from './_services/pool.service';
import { NodeService } from './_services/node.service';
import { ThorNode } from './_classes/thor-node';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  nodes: ThorNode[];
  pools: string[];
  stakers: string[];
  stats: GlobalStats;

  constructor(
    private nodeService: NodeService,
    private stakerService: StakerService,
    private statsService: StatsService,
    private poolService: PoolService,
  ) { }

  ngOnInit() {
    // this.getPools();
    // this.getStakers();
    this.getGlobalStats();
    this.getNodes();
  }

  getNodes(): void {
    this.nodeService.findAll().subscribe(
      (res) => this.nodes = res,
      (err) => console.error('error getting nodes: ', err)
    );
  }

  // getStakers(): void {

  //   this.stakerService.findAll().subscribe(
  //     (res) => this.stakers = res,
  //     (err) => console.error('error fetching stakers: ', err)
  //   );
  // }

  getGlobalStats(): void {

    this.statsService.getStats().subscribe(
      (res) => this.stats = res,
      (err) => console.error(err)
    );

  }

  // getPools(): void {

  //   // this.poolService.index().subscribe(
  //   //   (res) => this.pools = res,
  //   //   (err) => console.error(err)
  //   // );
  // }

}
