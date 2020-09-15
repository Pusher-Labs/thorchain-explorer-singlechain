import { Component, OnInit, Input } from '@angular/core';

import * as Datamap from 'node_modules/datamaps/dist/datamaps.all.min.js';
// This import causes index.d.ts is not a module error so importing from
// node_modules directly
// import * as Datamap from 'datamaps';

import { IPLocation } from '../../_classes/ip-location';
import getCountryCode from './countryCodeMap';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() data = [];
  map: Datamap;
  constructor() {}

  ngOnInit(): void {
    this.updateChart();
  }

  makeBubbles(): any[] {
    return this.data.map((item) => {
      return {
        name: `${item.ip} - ${item.country_name}`,
        latitude: item.latitude,
        longitude: item.longitude,
        radius: 8,
        fillKey: item.status,
        status: item.status,
      };
    });
  }

  makeDataset(): any[] {
    const result = [];

    this.data.forEach((item) => {
      const countryCode = getCountryCode(item.country_code);
      result[countryCode] = { fillKey: 'countriesWithNode', fillColor: 'blue' };
    });

    return result;
  }

  makeLi(country: string): string {
    const cities = {};
    this.data
      .filter((item) => item.country_name === country)
      .forEach((i) => {
        if (!cities[i.city]) {
          cities[i.city] = 0;
        }
        cities[i.city] += 1;
      });

    return Object.entries(cities)
      .map(([city, count]) => {
        return `<li style='padding: 5px 10px; display: flex; justify-content: space-between;'>
                <strong style='color: black;'>${city}</strong>
                <span style='color: black; padding: 0 3px'>${count}</span>
                </li>`;
      })
      .join('\n');
  }

  updateChart(): void {
    const element = document.getElementById('map');
    const mapColor = 'var(--map-fill-color)';
    if (element) {
      this.map = new Datamap({
        element,
        projection: 'mercator',
        fills: {
          defaultFill: mapColor,
          countriesWithNode: 'var(--map-countries-color)',
          active: 'white',
          standby: 'blue',
          disabled: 'gray',
          jailed: 'red',
        },
        data: this.makeDataset(),
        geographyConfig: {
          borderColor: mapColor,
          highlightBorderWidth: 1,
          highlightFillColor: (geo) => {
            // don't change color on mouse hover
            return geo.fillColor || 'gray';
          },
          highlightBorderColor: 'black',
          popupTemplate: (geo, d) => {
            if (!d) {
              return;
            }
            return `
            <div class='hoverinfo' style='width: 200px; padding: 0 0 5px 0; background-color: whitesmoke; border-radius: 5px; box-shadow: none;'>
              <span style='line-height: 1; padding: 5px 0px; color: black; font-size: 1.5rem; display:block; text-align: center; border-bottom: 1px solid lightgray;'>${
                geo.properties.name
              }</span>
              <ul style='margin-top: 5px;'>
              ${this.makeLi(geo.properties.name)}
              </ul>
            </div>
            `;
          },
        },
      });
      const bubbles = this.makeBubbles();
      this.map.bubbles(bubbles, {
        popupTemplate: (geo, data) => {
          return '<div class="hoverinfo">' + `${data.name} (${data.status})`;
        },
      });
    }
  }
}
