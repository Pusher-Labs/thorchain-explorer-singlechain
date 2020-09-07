import { Component, OnDestroy, OnInit } from '@angular/core';
import { NodeService } from '../_services/node.service';
import { NodeStatus, ThorNode } from '../_classes/thor-node';
import { VersionService, VersionSummary } from '../_services/version.service';
import { THORChainNetwork, ThorchainNetworkService } from '../_services/thorchain-network.service';
import { Subscription } from 'rxjs';
import { LastBlock, LastBlockService } from '../_services/last-block.service';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.scss']
})
export class NodesComponent implements OnInit, OnDestroy {

  thorNode: ThorNode;
  versionSummary: VersionSummary;
  subs: Subscription[];
  thorchainNetwork: THORChainNetwork;
  lastBlock: LastBlock;
  activeNodes: ThorNode[];
  standbyNodes: ThorNode[];
  disabledNodes: ThorNode[];
  error: string;

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

    this.activeNodes = null;
    this.standbyNodes = null;
    this.disabledNodes = null;
    this.error = null;

    this.nodeService.findAll().subscribe(
      (res) => {
        const tNodes = res.map( dto => new ThorNode(dto));

        this.activeNodes = tNodes
          .filter( (node) => node.status === NodeStatus.ACTIVE )
          .map( (node) => this.updateStatusIfJailed(node) );

        this.standbyNodes = tNodes
          .filter( (node) => node.status === NodeStatus.STANDBY || node.status === NodeStatus.READY)
          .map( (node) => this.updateStatusIfJailed(node) );

        this.disabledNodes = tNodes
          .filter( (node) => node.status === NodeStatus.DISABLED )
          .map( (node) => this.updateStatusIfJailed(node) );

      },
      (err) => {
        console.error('NodesComponent -> getNodes: ', err);
        this.error = 'Error fetching Nodes';
      }
    );
  }

  /**
   * Update the node status if jailed
   */
  updateStatusIfJailed(node: ThorNode): ThorNode {
    const currentStatus = node.status;
    node.status = (this.nodeIsJailed(node)) ? NodeStatus.JAILED : currentStatus;

    return node;
  }

  /**
   * Check if node is jailed
   */
  nodeIsJailed(node: ThorNode): boolean {

    const jailReleaseHeight = Number(node.jail.releaseHeight);

    return (jailReleaseHeight > Number(this.lastBlock.thorchain));

  }

  getVersion(): void {
    this.versionSummary = null;
    this.versionService.fetch().subscribe(
      (res) => this.versionSummary = res,
      (err) => console.error('error fetching version summary: ', err)
    );
  }

  calculateNodesOnVersion(version: string): number {

    if (this.activeNodes) {

      const activeNodes = this.activeNodes;

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

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

}
