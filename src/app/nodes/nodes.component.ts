import { Component, OnInit, OnDestroy } from '@angular/core';
import { NodeService } from '../_services/node.service';
import { ThorNode, NodeStatus } from '../_classes/thor-node';
import { VersionService, VersionSummary } from '../_services/version.service';
import { ThorchainNetworkService, THORChainNetwork } from '../_services/thorchain-network.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.scss']
})
export class NodesComponent implements OnInit, OnDestroy {

  nodes: ThorNode[];
  thorNode: ThorNode;
  versionSummary: VersionSummary;
  subs: Subscription[];
  thorchainNetwork: THORChainNetwork;
  isInJail: boolean;

  constructor(
    private nodeService: NodeService,
    private versionService: VersionService,
    private thorchainNetworkService: ThorchainNetworkService) {
    const network$ = this.thorchainNetworkService.networkUpdated$.subscribe(
      (network) => {
        this.thorchainNetwork = network;
        this.getNodes();
        this.getVersion();
      }
    );

    this.subs = [network$];
  }

  ngOnInit(): void {
    this.getNodes();
    this.getVersion();
  }

  getNodes(): void {
    this.nodes = null;
    this.nodeService.findAll().subscribe(
      (res) => {
        this.nodes = res;
        this.checkIfJailed();
      },
      (err) => console.error('NodesComponent -> getNodes: ', err)
    );
  }

  getVersion(): void {
    this.versionSummary = null;
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
      const activeNodes = this.nodes.filter((node) => node.status === NodeStatus.ACTIVE);


      /**
       * Get the total count of active nodes that match version
       */
      const total = activeNodes.reduce((count, node) => {

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

  checkIfJailed() {

    this.nodes.map((value) => {
      const jailReleaseHeight = Number(value.jail.release_height);
      const activeBlockHeight = Number(value.active_block_height);

      if (jailReleaseHeight > activeBlockHeight) {
        value.status = NodeStatus.JAILED;
      }
      if (jailReleaseHeight === activeBlockHeight) {
        value.status = NodeStatus.STANDBY;
      }
    });

  }

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

}
