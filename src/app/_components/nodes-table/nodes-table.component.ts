import { Component, OnInit, Input } from '@angular/core';
import { ThorNode } from 'src/app/_classes/thor-node';
import { IconDefinition, faThumbtack } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nodes-table',
  templateUrl: './nodes-table.component.html',
  styleUrls: ['./nodes-table.component.scss']
})
export class NodesTableComponent implements OnInit {

  @Input() nodes: ThorNode[];
  @Input() tableName: string;

  pinIcon: IconDefinition;

  constructor() {
    this.pinIcon = faThumbtack;
  }

  ngOnInit(): void {
  }

  isPinned(nodeAddress: string){
    let pinned = false;
    try{
      const result = localStorage.getItem(`pinned-${nodeAddress}`);
      if (result !== null){
        pinned = JSON.parse(result);
      }
    }catch (err){}
    return !!pinned;
  }

  toggleNodePin(nodeAddress: string){
    let currentValue = false;
    try{
      currentValue = JSON.parse(localStorage.getItem(`pinned-${nodeAddress}`));
    }catch (err){}

    localStorage.setItem(`pinned-${nodeAddress}`, JSON.stringify(!currentValue));
  }

}
