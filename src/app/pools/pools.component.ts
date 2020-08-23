import { Component, OnInit, Input } from '@angular/core';
import { PoolService } from '../_services/pool.service';

@Component({
  selector: 'app-pools',
  templateUrl: './pools.component.html',
  styleUrls: ['./pools.component.scss']
})
export class PoolsComponent implements OnInit {

  pools: string[];

  constructor(private poolService: PoolService) { }

  ngOnInit(): void {
    this.getAssetPools();
  }

  getAssetPools(): void {
    this.poolService.index().subscribe(
      (res) => this.pools = res,
      (err) => console.error(err)
    );
  }

}
