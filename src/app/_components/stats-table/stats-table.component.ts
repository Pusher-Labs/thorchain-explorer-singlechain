import { Component, Input } from '@angular/core';
import { GlobalStats } from 'src/app/_services/stats.service';

@Component({
  selector: 'app-stats-table',
  templateUrl: './stats-table.component.html',
  styleUrls: ['./stats-table.component.scss']
})
export class StatsTableComponent {

  @Input() stats: GlobalStats;

  constructor() { }

}
