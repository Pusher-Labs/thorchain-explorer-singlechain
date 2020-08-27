import { Component, OnInit, Input } from '@angular/core';
import { TransactionDetail } from '../../_classes/transaction';

@Component({
  selector: 'app-tx-detail-table-data',
  templateUrl: './tx-detail-table-data.component.html',
  styleUrls: ['./tx-detail-table-data.component.scss']
})
export class TxDetailTableDataComponent implements OnInit {

  @Input() transactionDetail: TransactionDetail;
  @Input() direction: 'IN' | 'OUT';

  constructor() { }

  ngOnInit(): void {
  }

}
