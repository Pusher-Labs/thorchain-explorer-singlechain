import { Component, OnInit, OnDestroy } from '@angular/core';
import { NetworkService } from 'src/app/_services/network.service';
import { ConstantsService, MidgardConstants } from 'src/app/_services/constants.service';
import { ThorchainNetworkService, THORChainNetwork } from 'src/app/_services/thorchain-network.service';
import { Subscription } from 'rxjs';
import { NetworkStatus } from 'src/app/_classes/network-status';
import { CoinGeckoService } from 'src/app/_services/coingecko.service';

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
  AverageStandByBond: number;
  MaximumStandByBond: number;
  MedianStandByBond: number;
  MinimumStandByBond: number;
  TotalStandByBond: number;
  AverageActiveBond: number;
  MaximumActiveBond: number;
  MedianActiveBond: number;
  MinimumActiveBond: number;
  TotalActiveBond: number;
  activeBonds: number[];
  standByBonds: number[];
  subs: Subscription[];
  thorchainNetwork: THORChainNetwork;
  currentRate: number;
  error: string;

  constructor(
    private networkService: NetworkService,
    private constantsService: ConstantsService,
    private thorchainNetworkService: ThorchainNetworkService,
    private coinGeckoService: CoinGeckoService) {
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
    this.getCurrentRate();
  }

  getCurrentRate() {
    this.coinGeckoService.getCurrencyConversion().subscribe(
      (res) => {
        if (res.thorchain && res.thorchain.usd) {
          this.currentRate = res.thorchain.usd;
        }
      },
      (err) => console.error('error fetching current thorchain rate: ', err)
    );
  }

  getConstants(): void {

    this.error = null;

    this.constantsService.getConstants().subscribe(
      (res) => {
        this.constants = res;
        this.getNetworkStatus();
        this.standByBondMetrics();
        this.ActiveBondMetrics();
      },
      (err) => {
        console.error('error fetching constants...', err);
        this.error = 'Error Connecting to THORChain';
      }
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

        this.network = new NetworkStatus(res);

        this.orderActiveandStandByBonds();
      },
      (err) => {
        console.error('NetworkDetailsComponent -> error fetching network status: ', err);
        this.error = 'Error Connecting to THORChain';
      }
    );
  }

  orderActiveandStandByBonds(): void {

    if (this.network.activeBonds !== undefined) {
      for (const elem in this.network.activeBonds) {
        if (elem) {
          this.activeBonds.push(this.network.activeBonds[elem]);
        }
      }

      for (const elem in this.network.standbyBonds) {
        if (elem) {
          this.standByBonds.push(this.network.standbyBonds[elem]);
        }
      }

      this.activeBonds.sort((a, b) => b - a);
      this.standByBonds.sort((a, b) => b - a);
    }
  }

  standByBondMetrics(): void {
    this.networkService.network().subscribe(
      (res) => {
        this.AverageStandByBond = parseInt(res.bondMetrics.averageStandbyBond, 10) / 10 ** 8;
        this.MaximumStandByBond = parseInt(res.bondMetrics.maximumStandbyBond, 10) / 10 ** 8;
        this.MedianStandByBond = parseInt(res.bondMetrics.medianStandbyBond, 10) / 10 ** 8;
        this.MinimumStandByBond = parseInt(res.bondMetrics.minimumStandbyBond, 10) / 10 ** 8;
        this.TotalStandByBond = parseInt(res.bondMetrics.totalStandbyBond, 10) / 10 ** 8;
      },
      (err) => {
        console.error('NetworkDetailsComponent -> error fetching network status: ', err);
        this.error = 'Error Connecting to THORChain';
      }
    );
  }

  ActiveBondMetrics(): void {
    this.networkService.network().subscribe(
      (res) => {
        this.AverageActiveBond = parseInt(res.bondMetrics.averageActiveBond, 10) / 10 ** 8;
        this.MaximumActiveBond = parseInt(res.bondMetrics.maximumActiveBond, 10) / 10 ** 8;
        this.MedianActiveBond = parseInt(res.bondMetrics.medianActiveBond, 10) / 10 ** 8;
        this.MinimumActiveBond = parseInt(res.bondMetrics.minimumActiveBond, 10) / 10 ** 8;
        this.TotalActiveBond = parseInt(res.bondMetrics.totalActiveBond, 10) / 10 ** 8;
      },
      (err) => {
        console.error('NetworkDetailsComponent -> error fetching network status: ', err);
        this.error = 'Error Connecting to THORChain';
      }
    );
  }

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

}
