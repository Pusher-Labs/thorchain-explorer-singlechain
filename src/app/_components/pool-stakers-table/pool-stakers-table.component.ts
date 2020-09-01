import { Component, OnInit, Input } from '@angular/core';
import { PoolStaker } from 'src/app/_classes/pool-staker';

@Component({
  selector: 'app-pool-stakers-table',
  templateUrl: './pool-stakers-table.component.html',
  styleUrls: ['./pool-stakers-table.component.scss']
})
export class PoolStakersTableComponent implements OnInit {

  @Input() stakers: PoolStaker[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
