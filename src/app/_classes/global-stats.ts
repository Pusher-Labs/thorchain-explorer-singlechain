import { FormattableAsset } from './helpers/formattable-asset';

export interface GlobalStatsDTO {
  dailyActiveUsers: string;
  monthlyActiveUsers: string;
  totalUsers: string;
  dailyTx: string;
  monthlyTx: string;
  totalTx: string;
  totalVolume24hr: string;
  totalVolume: string;
  totalStaked: string;
  totalDepth: string;
  totalEarned: string;
  poolCount: string;
  totalAssetBuys: string;
  totalAssetSells: string;
  totalStakeTx: string;
  totalWithdrawTx: string;
}

export class GlobalStats extends FormattableAsset {
  dailyActiveUsers: number;
  monthlyActiveUsers: number;
  totalUsers: number;
  dailyTx: number;
  monthlyTx: number;
  totalTx: number;
  totalVolume24hr: number;
  totalVolume: number;
  totalStaked: number;
  totalDepth: number;
  totalEarned: number;
  poolCount: number;
  totalAssetBuys: number;
  totalAssetSells: number;
  totalStakeTx: number;
  totalWithdrawTx: number;

  constructor(dto: GlobalStatsDTO) {
    super();

    this.dailyActiveUsers = Number(dto.dailyActiveUsers);
    this.monthlyActiveUsers = Number(dto.monthlyActiveUsers);
    this.totalUsers = Number(dto.totalUsers);
    this.dailyTx = Number(dto.dailyTx);
    this.monthlyTx = Number(dto.monthlyTx);
    this.totalTx = Number(dto.totalTx);
    this.totalVolume24hr = this.formatAssetUnits( Number(dto.totalVolume24hr), 8 );
    this.totalVolume = this.formatAssetUnits( Number(dto.totalVolume), 8 );
    console.log('STAKED:'+dto.totalStaked)
    this.totalStaked = this.formatAssetUnits( Number(dto.totalStaked), 8 );
    console.log('STAKED:'+this.totalStaked)
    this.totalDepth = this.formatAssetUnits( Number(dto.totalDepth), 8 );
    this.totalEarned = this.formatAssetUnits( Number(dto.totalEarned), 8 );
    this.poolCount = Number(dto.poolCount);
    this.totalAssetBuys = Number(dto.totalAssetBuys);
    this.totalAssetSells = Number(dto.totalAssetSells);
    this.totalStakeTx = Number(dto.totalStakeTx);
    this.totalWithdrawTx = Number(dto.totalWithdrawTx);

  }

}
