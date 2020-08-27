import { Component, OnInit, OnDestroy } from '@angular/core';
import { NodeService } from '../_services/node.service';
import { ThorNode } from '../_classes/thor-node';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThorchainNetworkService } from '../_services/thorchain-network.service';

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

  constructor(private route: ActivatedRoute, private nodeService: NodeService, private thorchainNetworkService: ThorchainNetworkService) {
    this.isInJail = false;

    const network$ = this.thorchainNetworkService.network$.subscribe(
      (_) => {
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

    this.nodeService.findOne(this.address).subscribe(
      (res) => {
        this.thorNode = res;

        if (res.jail) {

          const jailReleaseHeight = Number(res.jail.release_height);
          const activeBlockHeight = Number(res.active_block_height);

          if (jailReleaseHeight && activeBlockHeight) {
            this.isInJail = (res.jail.node_address === res.node_address)
            && (jailReleaseHeight > activeBlockHeight)
              ? true
              : false;
          }

        }

      },
      (err) => {
        console.error('error fetching node: ', err);
        this.error = 'An error occurred searching for this node';
      }
    );
  }

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

}
