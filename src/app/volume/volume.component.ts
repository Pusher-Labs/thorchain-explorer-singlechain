import { Component, OnInit } from '@angular/core';
import { VolumeService } from '../_services/volume.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.scss']
})
export class VolumeComponent implements OnInit {
  states = [
    { name: 'Hour', value: 'hour' },
    { name: 'Day', value: 'day' },
    { name: 'Month', value: 'month' },
    { name: 'Year', value: 'year' }
  ];

  Highcharts = Highcharts;
  chartOptions: object;
  timeString: Array<string> = new Array();
  result: number;
  timeNow: number;
  unixHour: number;
  timeLabels: number[];

  private totalVolume: any[] = [{ data: [] }];
  private buyVolume: any[] = [{ data: [] }];
  private sellVolume: any[] = [{ data: [] }];

  constructor(private volumeService: VolumeService) {
    this.unixHour = 3600;
    this.timeNow = Math.floor(Date.now() / 1000);
  }

  ngOnInit(): void {
    this.getDefaultData();
  }

  onChange(event: any) {
    const value = event.target.value;
    if (value === 'hour') {
      return this.getDefaultData();
    }
    if (value === 'day') {
      this.result = this.timeNow - (this.timeLabels.length * (this.unixHour * 24));
    }
    if (value === 'month') {
      this.result = this.timeNow - (this.timeLabels.length * (this.unixHour * 730));
    }
    if (value === 'year') {
      this.result = this.timeNow - (this.timeLabels.length * (this.unixHour * 8760));
    }

    this.volumeService.queryVolume(value, this.result, this.timeNow).subscribe(val => {
      this.totalVolume = [{ data: val.map(prop => prop.totalVolume) }];
      this.totalVolume = [{ data: this.totalVolume[0].data.toString().split(',').map((item: string) => parseInt(item, 10)) }];
      this.buyVolume = [{ data: val.map(prop => prop.buyVolume) }];
      this.buyVolume = [{ data: this.buyVolume[0].data.toString().split(',').map((item: string) => parseInt(item, 10)) }];
      this.sellVolume = [{ data: val.map(prop => prop.sellVolume) }];
      this.sellVolume = [{ data: this.sellVolume[0].data.toString().split(',').map((item: string) => parseInt(item, 10)) }];

      this.chartOptions = {
        series: [
          {
            name: 'totalVolume',
            data: this.totalVolume[0].data
          },
          {
            name: 'buyVolume',
            data: this.buyVolume[0].data
          },
          {
            name: 'sellVolume',
            data: this.sellVolume[0].data
          }
        ]
      };
    });
  }

  getDefaultData() {
    const defaultChoose = 'hour';
    this.result = this.timeNow - (24 * (this.unixHour));
    this.volumeService.queryVolume(defaultChoose, this.result, this.timeNow).subscribe(value => {
      this.timeLabels = value.map(val => val.time);
      for (const iter of this.timeLabels) {
        const givenSeconds = iter;
        const monthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const dateObj = new Date(givenSeconds * 1000);
        const hours = dateObj.getUTCHours();
        const minutes = dateObj.getUTCMinutes();
        const day = dateObj.getDate();
        const year = dateObj.getFullYear();
        const month = monthsArr[dateObj.getMonth()];

        this.timeString.push(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}\
        ${day.toString()} ${month.toString()} ${year.toString()}`);
      }
      this.totalVolume = [{ data: value.map(val => val.totalVolume) }];
      this.totalVolume = [{ data: this.totalVolume[0].data.toString().split(',').map((item) => parseInt(item, 10)) }];
      this.buyVolume = [{ data: value.map(val => val.buyVolume) }];
      this.buyVolume = [{ data: this.buyVolume[0].data.toString().split(',').map((item) => parseInt(item, 10)) }];
      this.sellVolume = [{ data: value.map(val => val.sellVolume) }];
      this.sellVolume = [{ data: this.sellVolume[0].data.toString().split(',').map((item) => parseInt(item, 10)) }];

      this.chartOptions = {
        title: {
          text: 'Volume History'
        },
        lang: {
          noData: 'No data at the moment'
        },
        yAxis: {
          title: {
            text: 'Volume',
            gridLineWidth: 1
          }
        },
        xAxis: {
          title: {
            text: 'Time'
          },
          gridLineWidth: 1,
          categories: this.timeString
        },
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom'
        },
        chart: {
          styledMode: true
        },
        series: [
          {
            name: 'totalVolume',
            data: this.totalVolume[0].data
          },
          {
            name: 'buyVolume',
            color: '#F07C04',
            data: this.buyVolume[0].data
          },
          {
            name: 'sellVolume',
            data: this.sellVolume[0].data
          }
        ]
      };
    });

  }
}
