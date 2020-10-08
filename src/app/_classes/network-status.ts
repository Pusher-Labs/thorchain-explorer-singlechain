import { FormattableAsset } from './helpers/formattable-asset';

export interface BondMetricsDTO {
  totalActiveBond: string;
  averageActiveBond: string;
  medianActiveBond: string;
  minimumActiveBond: string;
  maximumActiveBond: string;
  totalStandbyBond: string;
  averageStandbyBond: string;
  medianStandbyBond: string;
  minimumStandbyBond: string;
  maximumStandbyBond: string;
}

export class BondMetrics extends FormattableAsset {
  totalActiveBond: number;
  averageActiveBond: number;
  medianActiveBond: number;
  minimumActiveBond: number;
  maximumActiveBond: number;
  totalStandbyBond: number;
  averageStandbyBond: number;
  medianStandbyBond: number;
  minimumStandbyBond: number;
  maximumStandbyBond: number;

  constructor(bondMetricsDTO: BondMetricsDTO) {

    super();

    this.totalActiveBond = this.formatAssetUnits( Number(bondMetricsDTO.totalActiveBond), 8 );
    this.averageActiveBond = this.formatAssetUnits( Number(bondMetricsDTO.averageActiveBond), 8 );
    this.medianActiveBond = this.formatAssetUnits( Number(bondMetricsDTO.medianActiveBond), 8 );
    this.minimumActiveBond = this.formatAssetUnits( Number(bondMetricsDTO.minimumActiveBond), 8 );
    this.maximumActiveBond = this.formatAssetUnits( Number(bondMetricsDTO.maximumActiveBond), 8 );
    this.totalStandbyBond = this.formatAssetUnits( Number(bondMetricsDTO.totalStandbyBond), 8 );
    this.averageStandbyBond = this.formatAssetUnits( Number(bondMetricsDTO.averageStandbyBond), 8 );
    this.medianStandbyBond = this.formatAssetUnits( Number(bondMetricsDTO.medianStandbyBond), 8 );
    this.minimumStandbyBond = this.formatAssetUnits( Number(bondMetricsDTO.minimumStandbyBond), 8 );
    this.maximumStandbyBond = this.formatAssetUnits( Number(bondMetricsDTO.maximumStandbyBond), 8 );
  }

}

export interface BlockRewards {
  blockReward: string;
  bondReward: string;
  poolReward: string;
}

class NetworkStatusBase extends FormattableAsset {
  // bondMetrics: BondMetrics;
  activeNodeCount: number;
  standbyNodeCount: number;
  poolShareFactor: string;
  blockRewards: BlockRewards;
  bondingROI: string;
  stakingROI: string;
  nextChurnHeight: string;
  poolActivationCountdown: number;
}

export class NetworkStatusDTO extends NetworkStatusBase {
  activeBonds: string[];
  standbyBonds: string[];
  totalStaked: string;
  totalReserve: string;
  bondMetrics: BondMetricsDTO;
}

export class NetworkStatus extends NetworkStatusBase {

  activeBonds: number[];
  standbyBonds: number[];
  totalStaked: number;
  totalReserve: number;
  totalActiveBonded: number;
  totalStandbyBonded: number;
  totalBonded: number;
  totalCapital: number;
  bondMetrics: BondMetrics;


  constructor(networkDTO: NetworkStatusDTO) {
    super();

    this.bondMetrics = new BondMetrics(networkDTO.bondMetrics);

    /**
     * Bonds
     */
    this.activeBonds = (networkDTO.activeBonds)
      ? networkDTO.activeBonds.map( (bondStr) => this.formatAssetUnits( Number(bondStr), 8 ))
      : [];

    this.standbyBonds = (networkDTO.standbyBonds)
      ? networkDTO.standbyBonds.map( (bondStr) => this.formatAssetUnits( Number(bondStr), 8 ) )
      : [];

    this.totalActiveBonded = this.activeBonds.reduce( (total, bond) => total + bond, 0);
    this.totalStandbyBonded = this.standbyBonds.reduce( (total, bond) => total + bond, 0);
    this.totalBonded = this.totalActiveBonded + this.totalStandbyBonded;



    this.totalStaked = this.formatAssetUnits( (Number(networkDTO.totalStaked) * 2), 8);
    this.totalReserve = this.formatAssetUnits(Number(networkDTO.totalReserve), 8);

    this.activeNodeCount = networkDTO.activeNodeCount;
    this.standbyNodeCount = networkDTO.standbyNodeCount;
    this.poolShareFactor = networkDTO.poolShareFactor;
    this.blockRewards = networkDTO.blockRewards;
    this.bondingROI = networkDTO.bondingROI;
    this.stakingROI = networkDTO.stakingROI;
    this.nextChurnHeight = networkDTO.nextChurnHeight;
    this.poolActivationCountdown = networkDTO.poolActivationCountdown;

    this.totalCapital = this.totalStaked + this.totalBonded + this.totalReserve;

  }

}
