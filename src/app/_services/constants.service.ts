import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ThorchainNetworkService, THORChainNetwork } from './thorchain-network.service';

export class MidgardConstants {
  // tslint:disable-next-line:variable-name
  int_64_values: {
    BadValidatorRate: number,
    BlocksPerYear: number,
    DesireValidatorSet: number,
    DoubleSignMaxAge: number,
    EmissionCurve: number,
    FailKeySignSlashPoints: number,
    FailKeygenSlashPoints: number,
    FundMigrationInterval: number,
    JailTimeKeygen: number,
    JailTimeKeysign: number,
    LackOfObservationPenalty: number,
    MinimumBondInRune: number,
    MinimumNodesForBFT: number,
    MinimumNodesForYggdrasil: number,
    NewPoolCycle: number,
    ObserveSlashPoints: number,
    OldValidatorRate: number,
    RotatePerBlockHeight: number,
    RotateRetryBlocks: number,
    SigningTransactionPeriod: number,
    StakeLockUpBlocks: number,
    TransactionFee: number,
    ValidatorRotateInNumBeforeFull: number,
    ValidatorRotateNumAfterFull: number,
    ValidatorRotateOutNumBeforeFull: number,
    WhiteListGasAsset: number,
    YggFundLimit: number
  };
  // tslint:disable-next-line:variable-name
  bool_values: {
    StrictBondStakeRatio: boolean;
  };
  // tslint:disable-next-line:variable-name
  string_values: {
    DefaultPoolStatus: string;
  };

}

export interface StringDictionary {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  constructor(private http: HttpClient, private thorchainNetworkService: ThorchainNetworkService) { }

  getConstants(): Observable<MidgardConstants> {
    return this.http.get<MidgardConstants>(`${this.thorchainNetworkService.midgardBasePath}/v1/thorchain/constants`);
  }

  getMimir(): Observable<StringDictionary> {
    return this.http.get<StringDictionary>(
      `${this.thorchainNetworkService.nodeBasePath}/thorchain/mimir`,
      {params: this.thorchainNetworkService.nodeReqParams}
    );
  }

}
