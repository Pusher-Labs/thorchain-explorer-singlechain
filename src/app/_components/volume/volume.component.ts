import { Component, OnInit, OnDestroy } from '@angular/core';
import { VolumeService } from '../../_services/volume.service';
import { ThorchainNetworkService } from 'src/app/_services/thorchain-network.service';
import { Subscription } from 'rxjs';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { UiStyleToggleService, ThemeMode } from '../../_services/ui-style-toggle.service';

@Component({
  selector: 'app-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.scss']
})
export class VolumeComponent implements OnInit, OnDestroy {
  states = [
    { name: 'Hour', value: 'hour' },
    { name: 'Day', value: 'day' },
    // { name: 'Month', value: 'month' },
    // { name: 'Year', value: 'year' }
  ];

  theme: string;
  timeString: Array<string> = new Array();
  result: number;
  timeNow: number;
  unixHour: number;
  timeLabels: number[];
  subs: Subscription[];

  private totalVolume: any[] = [{ data: [] }];
  private buyVolume: any[] = [{ data: [] }];
  private sellVolume: any[] = [{ data: [] }];

  public lineChartData: ChartDataSets[] = [
    { data: this.totalVolume, label: 'totalVolume' },
    { data: this.buyVolume, label: 'buyVolume' },
    { data: this.sellVolume, label: 'sellVolume' }
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions = {};

  public lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  constructor(private volumeService: VolumeService, private thorchainNetworkService: ThorchainNetworkService,
              uiService: UiStyleToggleService) {
    this.unixHour = 3600;
    this.timeNow = Math.floor(Date.now() / 1000);

    const theme$ = uiService.theme$.subscribe(
      (theme) => {
        this.theme = theme;

        this.changeTheme();
      }
    );

    const network$ = this.thorchainNetworkService.networkUpdated$.subscribe(
      (_) => {
        this.getDefaultData();
      }
    );

    this.subs = [network$, theme$];

  }

  ngOnInit(): void {
    this.getDefaultData();
  }

  changeTheme() {
    this.lineChartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      title: {
        display: true,
        text: 'Volume History',
        fontColor: (this.theme === ThemeMode.DARK) ? 'white' : 'black',
        fontSize: '13'
      },
      ticks: {
        fontFamily: 'monospace'
      },
      legend: {
        labels: {
          fontColor: (this.theme === ThemeMode.DARK) ? 'white' : 'black'
        }
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Volume',
            fontStyle: 'bold',
            fontSize: '13',
            fontColor: (this.theme === ThemeMode.DARK) ? 'white' : 'black'
          },
          ticks: {
            fontColor: (this.theme === ThemeMode.DARK) ? 'white' : 'black',
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Time (UTC)',
            fontStyle: 'bold',
            fontSize: '13',
            fontColor: (this.theme === ThemeMode.DARK) ? 'white' : 'black'
          },
          ticks: {
            fontColor: (this.theme === ThemeMode.DARK) ? 'white' : 'black',
          }
        }]
      }
    };
  }

  getDefaultData() {
    const defaultChoose = 'hour';
    this.result = this.timeNow - (24 * (this.unixHour));
    this.volumeService.queryVolume(defaultChoose, this.result, this.timeNow).subscribe(value => {
      this.timeLabels = value.map(val => val.time);
      this.setHourLabels();
      this.totalVolume = [{ data: value.map(val => +val.totalVolume / (10 ** 8)) }];
      this.totalVolume = [{ data: this.totalVolume[0].data.toString().split(',').map((item) => parseInt(item, 10)) }];
      this.buyVolume = [{ data: value.map(val => +val.buyVolume / (10 ** 8)) }];
      this.buyVolume = [{ data: this.buyVolume[0].data.toString().split(',').map((item) => parseInt(item, 10)) }];
      this.sellVolume = [{ data: value.map(val => +val.sellVolume / (10 ** 8)) }];
      this.sellVolume = [{ data: this.sellVolume[0].data.toString().split(',').map((item) => parseInt(item, 10)) }];

      this.lineChartData = [
        { data: this.totalVolume[0].data, label: 'totalVolume' },
        { data: this.buyVolume[0].data, label: 'buyVolume' },
        { data: this.sellVolume[0].data, label: 'sellVolume' }
      ];
      this.lineChartLabels = this.timeString;
    });
  }

  onChange(event: any) {
    const value = event.target.value;
    if (value === 'hour') {
      this.getDefaultData();
      return;
    }
    if (value === 'day') {
      this.result = this.timeNow - (30 * (this.unixHour * 24));
    }
    // if (value === 'month') {
    //   this.result = this.timeNow - (30 * (this.unixHour * 730));
    // }
    // if (value === 'year') {
    //   this.result = this.timeNow - (30 * (this.unixHour * 8760));
    // }

    this.volumeService.queryVolume(value, this.result, this.timeNow).subscribe(val => {

      this.timeLabels = val.map(vol => vol.time);

      this.setDayLabels();


      this.totalVolume = [{ data: val.map(prop => +prop.totalVolume / (10 ** 8)) }];
      this.totalVolume = [{ data: this.totalVolume[0].data.toString().split(',').map((item: string) => parseInt(item, 10)) }];
      this.buyVolume = [{ data: val.map(prop => +prop.buyVolume / (10 ** 8)) }];
      this.buyVolume = [{ data: this.buyVolume[0].data.toString().split(',').map((item: string) => parseInt(item, 10)) }];
      this.sellVolume = [{ data: val.map(prop => +prop.sellVolume / (10 ** 8)) }];
      this.sellVolume = [{ data: this.sellVolume[0].data.toString().split(',').map((item: string) => parseInt(item, 10)) }];

      this.lineChartData = [
        { data: this.totalVolume[0].data, label: 'totalVolume' },
        { data: this.buyVolume[0].data, label: 'buyVolume' },
        { data: this.sellVolume[0].data, label: 'sellVolume' }
      ];
      this.lineChartLabels = this.timeString;
    });
  }

  setHourLabels() {
    this.timeString = [];
    for (const iter of this.timeLabels) {
      const givenSeconds = iter;
      const monthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const dateObj = new Date(givenSeconds * 1000);
      const hours = dateObj.getUTCHours();
      const minutes = dateObj.getUTCMinutes();
      const day = dateObj.getUTCDate();
      const month = monthsArr[dateObj.getUTCMonth()];

      this.timeString.push(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}\
      ${day.toString()} ${month.toString()}`);
    }

  }

  setDayLabels() {
    this.timeString = [];

    for (const iter of this.timeLabels) {

      const givenSeconds = iter;
      const monthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const dateObj = new Date(givenSeconds * 1000);
      const day = dateObj.getUTCDate();
      const year = dateObj.getUTCFullYear();
      const month = monthsArr[dateObj.getUTCMonth()];

      this.timeString.push(`${day.toString()} ${month.toString()} ${year.toString()}`);
    }

  }

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

}
