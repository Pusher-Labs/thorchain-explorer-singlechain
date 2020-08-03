import { Component, OnInit } from '@angular/core';
import { NodeService } from '../_services/node.service';
import { ThorNode } from '../_classes/thor-node';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.scss']
})
export class NodesComponent implements OnInit {

  nodes: ThorNode[];

  constructor(private nodeService: NodeService) { }

  ngOnInit(): void {
    this.getNodes();
  }

  getNodes(): void {
    this.nodeService.findAll().subscribe(
      (res) => this.nodes = res,
      (err) => console.error('NodesComponent -> getNodes: ', err)
    );
  }

}
