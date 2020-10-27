import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-response-links',
  templateUrl: './response-links.component.html',
  styleUrls: ['./response-links.component.scss'],
})
export class ResponseLinksComponent implements OnInit {
  @Input() response;
  formattedResponse = [];

  // @Todo we can do some more clever stuff in future for this.
  // For now I just manually create custom response link stuff here.
  // Since swagger doesn't give any HATEOS kind of stuff atm.
  nextMap = {
    '/v1/pools': (item) => {
      const routerLink = `/v1/pools/detail`;
      const queryParams = { asset: item };
      const urlP = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        urlP.set(key, value);
      });

      return {
        routerLink,
        queryParams,
        label: item,
        prettyUrl: `${routerLink}?${urlP.toString()}`,
      };
    },
    '/v1/stakers': (item) => {
      const routerLink = `/v1/stakers/${item}`;

      return {
        routerLink,
        label: `${item.substring(0, 10)}...`,
        prettyUrl: routerLink,
      };
    },
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    const parser = this.nextMap[this.router.url];
    if (parser) {
      this.formattedResponse = this.response.map((item) => parser(item));
    }
  }
}
