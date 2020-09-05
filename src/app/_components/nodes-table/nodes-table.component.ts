import { Component, OnInit, Input } from '@angular/core';
import { ThorNode } from 'src/app/_classes/thor-node';

@Component({
  selector: 'app-nodes-table',
  templateUrl: './nodes-table.component.html',
  styleUrls: ['./nodes-table.component.scss']
})
export class NodesTableComponent implements OnInit {

  @Input() nodes: ThorNode[];
  @Input() tableName: string;

  constructor() { }

  ngOnInit(): void {
  }

}
