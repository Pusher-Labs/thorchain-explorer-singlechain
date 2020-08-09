import { Component, OnInit } from '@angular/core';
import { NodeService } from '../_services/node.service';
import { ThorNode, NodeStatus } from '../_classes/thor-node';
import { VersionService, VersionSummary } from '../_services/version.service';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.scss']
})
export class NodesComponent implements OnInit {

  nodes: ThorNode[];
  versionSummary: VersionSummary;

  constructor(private nodeService: NodeService, private versionService: VersionService) { }

  ngOnInit(): void {
    this.getNodes();
    this.getVersion();
  }

  getNodes(): void {
    this.nodeService.findAll().subscribe(
      (res) => this.nodes = res,
      (err) => console.error('NodesComponent -> getNodes: ', err)
    );
  }

  getVersion(): void {
    this.versionService.fetch().subscribe(
      (res) => this.versionSummary = res,
      (err) => console.error('error fetching version summary: ', err)
    );
  }

  calculateNodesOnVersion(version: string): number {

    if (this.nodes) {

      /**
       * Filter for Active Nodes
       */
      const activeNodes = this.nodes.filter( (node) => node.status === NodeStatus.ACTIVE );


      /**
       * Get the total count of active nodes that match version
       */
      const total = activeNodes.reduce( (count, node) => {

        if (node.version === version) {
          count++;
        }

        return count;

      }, 0);


      /**
       * Return percentage of total nodes running version
       */
      return total / activeNodes.length;

    }

    console.error('nodes is not set');

    return null;

  }

}
