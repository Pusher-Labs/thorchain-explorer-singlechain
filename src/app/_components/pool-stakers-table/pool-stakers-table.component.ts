import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PoolStaker } from 'src/app/_classes/pool-staker';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { UiStyleToggleService, ThemeMode } from 'src/app/_services/ui-style-toggle.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pool-stakers-table',
  templateUrl: './pool-stakers-table.component.html',
  styleUrls: ['./pool-stakers-table.component.scss']
})
export class PoolStakersTableComponent implements OnInit, OnDestroy {

  @Input() stakers: PoolStaker[];

  theme: string;
  num: number;
  private totalPool: any[] = [{ data: [] }];
  subs: Subscription[];
  public pieChartData: ChartDataSets[] = [
    { data: this.totalPool, label: 'Total Pool' },
  ];
  public pieChartLabels: Label[] = [];
  public pieChartOptions = {};

  public pieChartLegend = false;
  public pieChartType = 'pie';
  public pieChartPlugins = [pluginAnnotations];

  constructor(uiService: UiStyleToggleService) {
    const theme$ = uiService.theme$.subscribe(
      (theme) => {
        this.theme = theme;

        this.changeTheme();
      }
    );

    this.subs = [theme$];
  }

  ngOnInit(): void {
    if (this.stakers !== undefined) {
      this.getDefaultData();
    }
  }

  changeTheme() {
    this.pieChartOptions = {
      responsive: false,
      maintainAspectRatio: true,
      title: {
        display: true,
        text: 'Total Pool %',
        fontColor: (this.theme === ThemeMode.DARK) ? 'white' : 'black',
        fontSize: '13',
        fontFamily: 'monospace',
      },
      ticks: {
        fontFamily: 'monospace'
      },
      legend: {
        labels: {
          fontColor: (this.theme === ThemeMode.DARK) ? 'white' : 'black',
          fontFamily: 'monospace',
          defaultFontFamily: 'monospace',

        }
      },
    };
  }

  getDefaultData(): void {
    this.num = 0;
    this.stakers.map(item => this.num += (+item.units / (10 ** 8)));
    this.pieChartData = [
      { data: this.stakers.map(val => (((+val.units / (10 ** 8))) * 100) / this.num), label: 'totalPool', fill: true }
    ];
    this.pieChartLabels = this.stakers.map((value) => value.asset_address.substring(0, 12) + '...');
  }

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

}
