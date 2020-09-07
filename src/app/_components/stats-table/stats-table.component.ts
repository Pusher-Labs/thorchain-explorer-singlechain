import { Component, Input, OnInit } from '@angular/core';
import { GlobalStats } from 'src/app/_services/stats.service';
import { CoinGeckoService } from 'src/app/_services/coingecko.service';

@Component({
  selector: 'app-stats-table',
  templateUrl: './stats-table.component.html',
  styleUrls: ['./stats-table.component.scss']
})
export class StatsTableComponent implements OnInit {

  @Input() stats: GlobalStats;
  currentRate: number;
  volume24hr: number;
  totalVolume: number;
  totalStaked: number;
  totalDepth: number;

  constructor(private coinGeckoService: CoinGeckoService) { }

  ngOnInit(): void {
    this.getCurrentRate();
  }

  getCurrentRate() {
    this.coinGeckoService.getCurrencyConversion().subscribe(
      (res) => {
        if (res.thorchain && res.thorchain.usd) {
          this.currentRate = res.thorchain.usd;
          this.getStatsValue();
        }
      },
      (err) => console.error('error fetching current thorchain rate: ', err)
    );
  }

  getStatsValue(): void {
    this.volume24hr = parseInt(this.stats.totalVolume24hr, 10) / 10 ** 8;
    this.totalVolume = parseInt(this.stats.totalVolume, 10) / 10 ** 8;
    this.totalStaked = parseInt(this.stats.totalStaked, 10) / 10 ** 8;
    this.totalDepth = parseInt(this.stats.totalDepth, 10) / 10 ** 8;
  }

}
