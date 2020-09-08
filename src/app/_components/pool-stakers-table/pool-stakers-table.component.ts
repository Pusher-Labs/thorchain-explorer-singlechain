import { Component, OnInit, Input } from '@angular/core';
import { PoolStaker } from 'src/app/_classes/pool-staker';

@Component({
  selector: 'app-pool-stakers-table',
  templateUrl: './pool-stakers-table.component.html',
  styleUrls: ['./pool-stakers-table.component.scss']
})


export class PoolStakersTableComponent implements OnInit {

  @Input() stakers: PoolStaker[] = [];
  sortedStakers: PoolStaker[] = [];
  selectedSortOption = 'Default';
  sortOptions = [
    'Default',
    'Ownership Desc'
  ];
  sumStaked: number;
  ownership = {};

  constructor() {
  }

  ngOnInit(): void {
    this.updateOwnershipPercent();
    this.sortedStakers = [...this.stakers];


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
    this.sortedStakers = [...this.stakers];
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
    this.stakers.map(item => this.sumStaked += (+item.units / (10 ** 8)));

    this.stakers.forEach((item) => {
      this.ownership[item.asset_address] = +item.units / 10 ** 8 / this.sumStaked;
    });
  }

}
