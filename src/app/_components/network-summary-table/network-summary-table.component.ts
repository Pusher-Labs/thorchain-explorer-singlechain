import { Component, Input } from '@angular/core';
import { NetworkStatus } from 'src/app/_services/network.service';

@Component({
  selector: 'app-network-summary-table',
  templateUrl: './network-summary-table.component.html',
  styleUrls: ['./network-summary-table.component.scss']
})
export class NetworkSummaryTableComponent{

  @Input() network: NetworkStatus;

  constructor() { }

  isFinite(num: string): boolean {

    return Number.isFinite(+num);

  }

}
