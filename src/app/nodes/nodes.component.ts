import { Component, OnInit, OnDestroy } from '@angular/core';
import { NodeService } from '../_services/node.service';
import { ThorNode, NodeStatus } from '../_classes/thor-node';
import { VersionService, VersionSummary } from '../_services/version.service';
import { ThorchainNetworkService, THORChainNetwork } from '../_services/thorchain-network.service';
import { Subscription } from 'rxjs';
import { LastBlockService, LastBlock } from '../_services/last-block.service';

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
  lastBlock: LastBlock;

  constructor(
    private nodeService: NodeService,
    private versionService: VersionService,
    private lastBlockService: LastBlockService,
    private thorchainNetworkService: ThorchainNetworkService) {
    const network$ = this.thorchainNetworkService.networkUpdated$.subscribe(
      (network) => {
        this.thorchainNetwork = network;
        this.getLastBlock();
        this.getVersion();
      }
    );

    this.subs = [network$];
  }

  ngOnInit(): void {
    this.getVersion();
    this.getLastBlock();
  }

  getLastBlock() {
    this.lastBlockService.getLastBlock().subscribe(
      (res) => {
        this.lastBlock = res;
        this.getNodes();
      },
      (err) => console.error('error fetching last block: ', err)
    );
  }

  getNodes(): void {
    this.nodes = null;
    this.nodeService.findAll().subscribe(
      (res) => {
        this.nodes = res;

        /**
         * TODO: add back in when we can check against a jailed node
         */
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

      if (jailReleaseHeight > Number(this.lastBlock.thorchain)) {
        value.status = NodeStatus.JAILED;
      }

    });

  }

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

}
