import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ApiService } from '../_services/api-explorer.service';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-explorer-ui',
  templateUrl: './explorer-ui.component.html',
  styleUrls: ['./explorer-ui.component.scss'],
})
export class ExplorerUiComponent implements OnInit, OnDestroy {
  currentEndpoint = null;
  response = null;
  loading = false;
  paramMap = {};
  pathMap = {};
  subs = [];

  // friendly overrides in case of no data
  friendOverrides = {
    offset: 1,
    limit: 10,
    asset: 'BNB.BNB',
    interval: '5min',
    from: '1501351773',
    to: '1601351773',
    view: 'simple',
    address: 'bnb1rv89nkw2x5ksvhf6jtqwqpke4qhh7jmudpvqmj',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {
    const sub = this.router.events
      .pipe(filter((ev) => ev instanceof NavigationEnd))
      .subscribe((ev) => {
        if (!this.paramMap[this.router.url]) {
          this.paramMap[this.router.url] = {};
        }
        if (!this.pathMap[this.router.url]) {
          this.pathMap[this.router.url] = {};
        }
        this.updateEndpoint(this.router.url);
        // this.updateParamFromUrl(this.router.url);
      });
    this.subs.push(sub);
  }

  getValue(param): string {
    let result = this.friendOverrides[param.name];
    if (param.in === 'path') {
      result = this.pathMap[this.router.url][param.name];
      if (!result) {
        if (
          this.currentEndpoint.customParams &&
          this.currentEndpoint.customParams[param.name]
        ) {
          result = this.currentEndpoint.customParams[param.name];
        }

        if (!result) {
          result = this.friendOverrides[param.name];
        }
      }
    } else {
      if (this.paramMap[this.router.url][param.name]) {
        result = this.paramMap[this.router.url][param.name];
      }
    }

    if (!result) {
      result = '';
    }
    return result;
  }

  shouldShowLinks(): boolean {
    // only pools and stakers support links atm.
    const supportedLinks = ['/v1/pools', '/v1/stakers'];
    const isSupported = false;
    const path = this.router.url.split('?')[0];
    return !this.loading && this.response && supportedLinks.includes(path);
  }

  searchParamsFromUrl(url): any {
    let currentQ = '';
    try {
      currentQ = url.split('?')[1];
    } catch (err) {
      // Ignore
    }
    return new URLSearchParams(currentQ);
  }

  async updateEndpoint(path): Promise<void> {
    this.loading = true;
    this.currentEndpoint = await this.api.getEndpoint(
      path,
      this.activatedRoute
    );

    const callingEndpoint = this.makePathWithParams();
    try {
      this.response = await this.api.callEndpoint({
        path: callingEndpoint,
      });
    } catch (err) {
      console.error('Call endpoint err:', err.message);
      console.log(err);
      this.response = err.error.message || err.error.error;
      console.log(this.response);
    }
    this.loading = false;
  }

  formatResponse(): string {
    return JSON.stringify(this.response, null, 1);
  }

  updateParams({ event, param }): void {
    if (param.in === 'path') {
      this.pathMap[this.router.url][event.target.name] = event.target.value;
    } else {
      this.paramMap[this.router.url][event.target.name] = event.target.value;
    }
  }

  updateParamFromUrl(url): void {
    const params = this.searchParamsFromUrl(url);
    for (const pair of params.entries()) {
      this.paramMap[this.router.url][pair[0]] = pair[1];
    }
  }

  submitQueries(e): void {
    e.preventDefault();
    const pathArr = [];

    //Stakers have weird curly braces so should not be replaced.
    if (!this.router.url.startsWith('/v1/stakers')) {
      let newUrl = this.router.url.split('?')[0];

      Object.entries(this.pathMap[this.router.url]).forEach(
        ([key, value]: any[]) => {
          newUrl = newUrl.replace(`%7B${key}%7D`, value);
        }
      );

      pathArr.push(newUrl);
    }

    this.router.navigate(pathArr, {
      queryParams: this.paramMap[this.router.url],
      queryParamsHandling: 'merge',
    });

    this.updateEndpoint(this.router.url);
  }

  makePathWithParams(): string {
    if (!this.currentEndpoint) {
      return;
    }
    let path = this.currentEndpoint.path.replace("/api-explorer", "");
    let hasQuery = false;
    const params = this.searchParamsFromUrl(this.router.url);
    this.currentEndpoint.params?.forEach((p) => {
      if (p.in === 'query') {
        let userValue = this.paramMap[this.router.url][p.name];

        // Doing some user friendly overrides in case of no data
        if (!userValue) {
          userValue = this.friendOverrides[p.name];
        }

        if (userValue) {
          params.set(p.name, userValue);
          hasQuery = true;
        }
      }
      if (p.in === 'path') {
        let userPathValue = this.pathMap[this.router.url][p.name];
        if (!userPathValue) {
          userPathValue = this.friendOverrides[p.name];
        }

        if (userPathValue) {
          path = path.replace(`{${p.name}}`, userPathValue);
        }
      }
    });

    if (hasQuery) {
      path += `?${params.toString()}`;
    }

    if (this.currentEndpoint.customParams) {
      Object.entries(this.currentEndpoint.customParams).forEach(
        ([key, value]) => {
          path = path.replace(`{${key}}`, value);
        }
      );
    }
    return path;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
