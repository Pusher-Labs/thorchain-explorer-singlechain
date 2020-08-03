import { Component, OnInit } from '@angular/core';
import { NodeService } from '../_services/node.service';
import { ThorNode } from '../_classes/thor-node';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {

  thorNode: ThorNode;
  address: string;
  isInJail: boolean;

  constructor(private route: ActivatedRoute, private nodeService: NodeService) {
    this.isInJail = false;
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe( (params) => {

      this.address = params.get('address');

      if (this.address) {
        this.getNode(this.address);
      }

    });


  }

  getNode(address: string): void {
    this.nodeService.findOne(address).subscribe(
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
      (err) => console.error('error fetching node: ', err)
    );
  }

}
