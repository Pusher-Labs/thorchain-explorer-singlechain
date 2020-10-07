import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PoolStaker } from 'src/app/_classes/pool-staker';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { UiStyleToggleService, ThemeMode } from 'src/app/_services/ui-style-toggle.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pool-members-table',
  templateUrl: './pool-members-table.component.html',
  styleUrls: ['./pool-members-table.component.scss']
})
export class PoolStakersTableComponent implements OnInit, OnDestroy {

  @Input() members: PoolStaker[] = [];
  sortedStakers: PoolStaker[] = [];
  selectedSortOption = 'Default';
  sortOptions = [
    'Default',
    'Ownership Desc'
  ];
  sumStaked: number;
  ownership = {};

  theme: string;
  num: number;
  // private totalPool: any[] = [{ data: [] }];
  subs: Subscription[];
  public pieChartData: ChartDataSets[] = [
    // { data: this.totalPool, label: 'Total Pool' },
  ];
  public pieChartLabels: Label[] = [];
  public pieChartOptions = {};

  public pieChartLegend = false;
  public pieChartType = 'pie';
  public pieChartPlugins = [pluginAnnotations];
  totalStaked: number;

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
    this.updateOwnershipPercent();
    this.sortedStakers = [...this.members];
    this.sortStakers();


    // Preserve user config for sort
    try{
      const result = localStorage.getItem(`pool-staker-sort`);
      if (result !== null){
        this.onSortChange(result);
      }
    }catch (err){}
  }

  onSortChange(value: string): void {
    this.selectedSortOption = value;

    localStorage.setItem(`pool-staker-sort`, value);

    if (this.selectedSortOption === 'Ownership Desc') {
      this.sortStakers();
    }else{
      this.resetSort();
    }

  }

  resetSort(): void {
    this.sortedStakers = [...this.members];
  }

  sortStakers(): void {
    this.sortedStakers.sort((a, b) => {
      // Sorting by units is same as sort by percentage
      // percentage is derived from units
      return +a.units < +b.units ? 1 : -1;
    });
  }

  updateOwnershipPercent(): void {
    this.sumStaked = 0;
    this.members.map(item => this.sumStaked += (+item.units / (10 ** 8)));

    this.members.forEach((item) => {
      this.ownership[item.asset_address] = +item.units / 10 ** 8 / this.sumStaked;
    });
    if (this.members !== undefined) {
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
    this.members.map(item => this.num += (+item.units / (10 ** 8)));

    this.totalStaked = this.members.reduce( (total, staker) => {
      return total + Number(staker.units) / (10 ** 8);
    }, 0);

    this.pieChartData = [
      { data: this.members.map(val => (((+val.units / (10 ** 8))) * 100) / this.num), label: 'totalPool', fill: true }
    ];
    this.pieChartLabels = this.members.map((value) => value.asset_address.substring(0, 12) + '...');
  }

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

}
