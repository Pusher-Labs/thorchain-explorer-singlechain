import { Component, Input } from '@angular/core';
import { NetworkStatus } from '../../_classes/network-status';

@Component({
  selector: 'app-network-summary-table',
  templateUrl: './network-summary-table.component.html',
  styleUrls: ['./network-summary-table.component.scss']
})
export class NetworkSummaryTableComponent{

  @Input() network: NetworkStatus;
  @Input() currentRate: number;

  constructor() { }

  isFinite(num: string): boolean {

    return Number.isFinite(+num);

  }

}
