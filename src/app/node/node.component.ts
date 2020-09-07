import { Component, OnInit, OnDestroy } from '@angular/core';
import { NodeService } from '../_services/node.service';
import { ThorNode, NodeStatus } from '../_classes/thor-node';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThorchainNetworkService, THORChainNetwork } from '../_services/thorchain-network.service';
import { LastBlockService, LastBlock } from '../_services/last-block.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit, OnDestroy {

  thorNode: ThorNode;
  address: string;
  isInJail: boolean;
  subs: Subscription[];
  error: string;
  thorchainNetwork: THORChainNetwork;
  lastBlock: LastBlock;

  constructor(private route: ActivatedRoute,
              private nodeService: NodeService,
              private lastBlockService: LastBlockService,
              private thorchainNetworkService: ThorchainNetworkService) {
    this.isInJail = false;

    const network$ = this.thorchainNetworkService.networkUpdated$.subscribe(
      (network) => {
        this.thorchainNetwork = network;
        this.getNode();
      }
    );

    this.subs = [network$];

  }


  ngOnInit(): void {

    const routeParams$ = this.route.paramMap.subscribe( (params) => {

      this.address = params.get('address');

      if (this.address) {
        this.getNode();
      }

    });

    this.subs.push(routeParams$);


  }

  getNode(): void {
    this.thorNode = null;
    this.lastBlockService.getLastBlock().subscribe(
      (lastBlockRes) => {
        this.lastBlock = lastBlockRes;

        this.nodeService.findOne(this.address).subscribe(
          (res) => {
            if (res.error) {
              this.error = 'Invalid account address. Are you on the correct network?';
            } else {

              this.thorNode = new ThorNode(res);

              if (this.thorNode.jail) {
                const jailReleaseHeight = Number(this.thorNode.jail.releaseHeight);

                if (jailReleaseHeight > Number(this.lastBlock?.thorchain)) {
                   this.isInJail = true;
                   this.thorNode.status = NodeStatus.JAILED;
                }
              }

            }

          },
          (err) => {
            console.error('error fetching node: ', err);
            this.error = 'An error occurred searching for this node';
          }
        );
      },
      (err) => {
          console.error('error fetching last block: ', err);
          this.error = 'An error occurred while fetching last block';
      }
    );
  }

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

}
