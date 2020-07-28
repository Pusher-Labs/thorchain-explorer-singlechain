import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchString: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  search() {

    console.log('search hit!: ', this.searchString);

    let queryParams: Params;

    if (this.searchString.substr(0, 4) === 'tbnb' || this.searchString.substr(0, 4) === 'thor' ) {
      queryParams = { offset: String(0), address: this.searchString };
    } else {
      queryParams = { offset: String(0), txid: this.searchString };
    }

    console.log('query params are: ', queryParams);

    this.router.navigate(
      ['/', 'txs'],
      {
        // relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      }
    );

    this.searchString = '';
  }

}
