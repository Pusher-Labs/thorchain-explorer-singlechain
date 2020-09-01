import { Component, OnInit, Input } from '@angular/core';
import { PoolStaker } from 'src/app/_classes/pool-staker';
import { IconDefinition, faExchangeAlt, faLevelDownAlt, faLevelUpAlt, faUndoAlt, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pool-stakers-table',
  templateUrl: './pool-stakers-table.component.html',
  styleUrls: ['./pool-stakers-table.component.scss']
})
export class PoolStakersTableComponent implements OnInit {

  swapIcon: IconDefinition;
  stakeIcon: IconDefinition;
  unStakeIcon: IconDefinition;
  refundIcon: IconDefinition;
  addIcon: IconDefinition;
  timesIcon: IconDefinition;

  @Input() stakers: PoolStaker[];

  constructor() {
    this.swapIcon = faExchangeAlt;
    this.stakeIcon = faLevelDownAlt;
    this.unStakeIcon = faLevelUpAlt;
    this.refundIcon = faUndoAlt;
    this.addIcon = faPlus;
    this.timesIcon = faTimes;
  }

  ngOnInit(): void {
  }

}
