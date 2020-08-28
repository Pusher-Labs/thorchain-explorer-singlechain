import { Component, OnInit, OnDestroy } from '@angular/core';
import { NetworkService, NetworkStatus } from 'src/app/_services/network.service';
import { ConstantsService, MidgardConstants } from 'src/app/_services/constants.service';
import { ConstantTableItem } from '../../_classes/constants-table';
import { ThorchainNetworkService, THORChainNetwork } from 'src/app/_services/thorchain-network.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-network-details',
  templateUrl: './network-details.component.html',
  styleUrls: ['./network-details.component.scss']
})
export class NetworkDetailsComponent implements OnInit, OnDestroy {

  constants: MidgardConstants;
  network: NetworkStatus;
  dailyBlockReward: number;
  dailyBondReward: number;
  dailyStakeReward: number;
  monthlyNodeBondReward: number;
  activeBonds: number[];
  standByBonds: number[];
  numbersValue: ConstantTableItem<number>;
  subs: Subscription[];
  thorchainNetwork: THORChainNetwork;

  constructor(
    private networkService: NetworkService,
    private constantsService: ConstantsService,
    private thorchainNetworkService: ThorchainNetworkService) {
      this.activeBonds = [];
      this.standByBonds = [];

      const network$ = this.thorchainNetworkService.networkUpdated$.subscribe(
        (_) => {
          this.getConstants();
        }
      );

      this.subs = [network$];

  }

  ngOnInit(): void {
    this.getConstants();
  }

  getConstants(): void {

    this.constantsService.getConstants().subscribe(
      (res) => {
        this.constants = res;
        this.getNetworkStatus();
      },
      (err) => console.error('error fetching constants...', err)
    );
  }

  getNetworkStatus(): void {
    this.networkService.network().subscribe(
      (res) => {

        const blocksPerYear = this.constants.int_64_values.BlocksPerYear;
        const activeNodeCount = res.activeNodeCount;

        this.dailyBlockReward = (+res.blockRewards.blockReward / 10 ** 8) * (blocksPerYear / 365);
        this.dailyBondReward = (+res.blockRewards.bondReward / 10 ** 8) * (blocksPerYear / 365);
        this.dailyStakeReward = (+res.blockRewards.stakeReward / 10 ** 8) * (blocksPerYear / 365);

        this.monthlyNodeBondReward = (this.dailyBondReward * 30) / activeNodeCount;

        this.network = res;

        this.orderActiveandStandByBonds();
      },
      (err) => console.error('NetworkDetailsComponent -> error fetching network status: ', err)
    );
  }

  orderActiveandStandByBonds(): void {

    if (this.network.activeBonds !== undefined) {
      for (const elem in this.network.activeBonds) {
        if (elem) {
          this.activeBonds.push(parseFloat(this.network.activeBonds[elem]));
        }
      }

      for (const elem in this.network.standbyBonds) {
        if (elem) {
          this.standByBonds.push(parseFloat(this.network.standbyBonds[elem]));
        }
      }

      this.activeBonds.sort((a, b) => b - a);
      this.standByBonds.sort((a, b) => b - a);
    }
  }

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

}
