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
        city: item.city,
        countryCode: item.country_code,
        radius: 5,
        fillKey: item.status,
        status: item.status,
        fillOpacity: 1,
        borderColor: 'white',
      };
    });
  }

  makeDataset(): any[] {
    const result = [];

    this.data.forEach((item) => {
      const countryCode = getCountryCode(item.country_code);
      result[countryCode] = {
        latitude: item.latitude,
        longitude: item.longitude,
        fillKey: 'countriesWithNode',
        fillColor: 'blue',
      };
    });

    return result;
  }

  // Takes alpha3 code
  makeLi(countryCode3: string): string {
    const cities = {};
    this.data
      .filter((item) => getCountryCode(item.country_code) === countryCode3)
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

  makePopupStyle(point: any): string {
    // Fix for overflowing on hover at the edge
    let popupStyle = 'position: absolute;';
    if (point.latitude > 50) {
      popupStyle += 'top: 0;';
    }
    if (point.latitude < -10) {
      popupStyle += 'bottom: 0;';
    }
    if (point.longitude > 100) {
      popupStyle += 'right: 0;';
    }
    if (point.longitude < -100) {
      popupStyle += 'left: 0;';
    }

    return popupStyle;
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
          active: 'green',
          standby: 'blue',
          disabled: 'black',
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

            const popupStyle = this.makePopupStyle(d);

            return `
            <div class="hoverinfo" style='${popupStyle} width: 200px; padding: 0 0 5px 0; background-color: whitesmoke; border-radius: 5px; box-shadow: none;'>
              <span style='line-height: 1; padding: 5px 0px; color: black; font-size: 1.5rem; display:block; text-align: center; border-bottom: 1px solid lightgray;'>${
                geo.properties.name
              }</span>
              <ul style='margin-top: 5px;'>
              ${this.makeLi(geo.id)}
              </ul>
            </div>
            `;
          },
        },
      });
      const bubbles = this.makeBubbles();
      this.map.bubbles(bubbles, {
        popupTemplate: (geo, data) => {
          let count = 0;
          this.data.forEach((item) => {
            if (item.city === data.city && item.country_code === data.countryCode) {
              count++;
            }
          });
          return `<div class="hoverinfo" style='${this.makePopupStyle(
            data
          )} border-radius: 4px; padding: 5px; display:flex; justify-content: space-between; min-width: 150px;'><span>${
            data.city
          }</span><span>(${count}) </span></div>`;
        },
      });
    }
  }
}
