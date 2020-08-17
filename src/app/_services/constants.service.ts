import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  constructor(private http: HttpClient) { }

  getConstants(): Observable<MidgardConstants> {
    return this.http.get<MidgardConstants>(`${environment.midgardUrl}/v1/thorchain/constants`);
  }

}
