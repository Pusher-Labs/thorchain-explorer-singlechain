import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from 'src/app/_classes/transaction';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent implements OnInit {

  @Input() transactions: Transaction[];

  constructor() { }

  ngOnInit(): void {
  }

}
