import { Component, Input, OnInit } from '@angular/core';
import { GlobalStats } from '../../_classes/global-stats';
import { CoinGeckoService } from 'src/app/_services/coingecko.service';

@Component({
  selector: 'app-stats-table',
  templateUrl: './stats-table.component.html',
  styleUrls: ['./stats-table.component.scss']
})
export class StatsTableComponent implements OnInit {

  @Input() stats: GlobalStats;
  currentRate: number;

  constructor(private coinGeckoService: CoinGeckoService) { }

  ngOnInit(): void {
    this.getCurrentRate();
  }

  getCurrentRate() {
    this.coinGeckoService.getCurrencyConversion().subscribe(
      (res) => {
        if (res.thorchain && res.thorchain.usd) {
          this.currentRate = res.thorchain.usd;
        }
      },
      (err) => console.error('error fetching current thorchain rate: ', err)
    );
  }


}
