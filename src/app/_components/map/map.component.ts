import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import topoData from './topoData';
import { Chart, ChartConfiguration } from 'chart.js';
import * as pluginGeo from 'chartjs-chart-geo';
import {
  UiStyleToggleService,
  ThemeMode,
} from '../../_services/ui-style-toggle.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() data = [];
  countries = [];
  chart: Chart;
  theme: string;

  constructor(uiService: UiStyleToggleService) {
    this.countries = pluginGeo.topojson.feature(
      topoData,
      topoData.objects.countries
    ).features;

    const theme$ = uiService.theme$.subscribe((theme) => {
      this.theme = theme;
      this.updateChart();
    });
  }

  ngOnInit(): void {
    Chart.plugins.register(pluginGeo);
    this.updateChart();
  }

  getChartOpts(): any {
    return {
      type: 'bubbleMap',
      data: {
        labels: this.data.map((d) => d.description),
        datasets: [
          {
            outline: this.countries,
            showOutline: true,
            backgroundColor: 'steelblue',
            outlineBorderColor:
            this.theme === ThemeMode.DARK ? 'white' : 'rgba(0,0,0,0.1)',
            data: this.data,
          },
        ],
      },
      options: {
        responsive: false,
        legend: {
          display: false,
        },
        scale: {
          projection: 'naturalEarth1',
        },
      },
    };
  }

  updateChart(): void {
    if (this.chart) {
      const opts = this.getChartOpts();
      this.chart.options = opts.options;
      this.chart.data = opts.data;
      this.chart.update();
    } else {
      try {
        const el = document.getElementById('map') as HTMLCanvasElement;
        const ctx = el.getContext('2d');
        this.chart = new Chart(ctx, this.getChartOpts());
      } catch (err) {}
    }
  }
}
