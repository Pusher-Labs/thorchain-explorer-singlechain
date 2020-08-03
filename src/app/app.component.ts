import { Component, OnInit } from '@angular/core';
import { StatsService, GlobalStats } from './_services/stats.service';
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

  constructor(private nodeService: NodeService, private statsService: StatsService) { }

  ngOnInit() {
    this.getGlobalStats();
    this.getNodes();
  }

  getNodes(): void {
    this.nodeService.findAll().subscribe(
      (res) => this.nodes = res,
      (err) => console.error('error getting nodes: ', err)
    );
  }

  getGlobalStats(): void {

    this.statsService.getStats().subscribe(
      (res) => this.stats = res,
      (err) => console.error(err)
    );

  }

}
