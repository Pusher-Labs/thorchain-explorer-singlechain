import { Component, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchString: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  search() {

    const isAddress = this.searchString.substr(0, 4) === 'tbnb'
      || this.searchString.substr(0, 3) === 'bnb'
      || this.searchString.substr(0, 4) === 'thor';

    const route = (isAddress)
      ? ['/', 'addresses', this.searchString]
      : ['/', 'txs'];

    const queryParams: Params = (isAddress)
      ? { offset: String(0) }
      : { offset: String(0), txid: this.searchString };

    this.router.navigate(
      route,
      {
        queryParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      }
    );

    this.searchString = '';
  }

}
