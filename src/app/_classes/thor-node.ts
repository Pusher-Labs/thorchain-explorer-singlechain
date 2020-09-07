import { IPLocation, sampleLocation } from './ip-location';
import { environment } from '../../environments/environment';

export enum NodeStatus {
  ACTIVE = 'active',
  STANDBY = 'standby',
  READY = 'ready',
  DISABLED = 'disabled',
  JAILED = 'jailed'
}

export interface ThorNodeDTO {
  node_address: string;
  status: NodeStatus;
  pub_key_set: {
    secp256k1: string;
    ed25519: string;
  };
  validator_cons_pub_key: string;
  bond: string;
  active_block_height: string;
  bond_address: string;
  status_since: string;
  signer_membership: string[];
  requested_to_leave: boolean;
  forced_to_leave: boolean;
  leave_height: string;
  ip_address: string;
  version: string;
  slash_points: string;
  jail: {
    node_address: string;
    release_height: string;
    reason: string;
  };
  current_award: string;
  error: string;
  location: IPLocation;
}

export class ThorNode {
  nodeAddress: string;
  status: NodeStatus;
  pubKeySet: {
    secp256k1: string;
    ed25519: string;
  };
  validatorConsPubKey: string;
  bond: string;
  activeBlockHeight: string;
  bondAddress: string;
  statusSince: string;
  signerMembership: string[];
  requestedToLeave: boolean;
  forcedToLeave: boolean;
  leaveHeight: string;
  ipAddress: string;
  version: string;
  slashPoints: string;
  jail: {
    nodeAddress: string;
    releaseHeight: string;
    reason: string;
  };
  currentAward: string;
  error: string;
  location: IPLocation;

  constructor(dto: ThorNodeDTO) {
    this.nodeAddress = dto.node_address;
    this.status = dto.status;
    this.pubKeySet = dto.pub_key_set;
    this.validatorConsPubKey = dto.validator_cons_pub_key;
    this.bond = dto.bond;
    this.activeBlockHeight = dto.active_block_height;
    this.bondAddress = dto.bond_address;
    this.statusSince = dto.status_since;
    this.signerMembership = dto.signer_membership;
    this.requestedToLeave = dto.requested_to_leave;
    this.forcedToLeave = dto.forced_to_leave;
    this.leaveHeight = dto.leave_height;
    this.ipAddress = dto.ip_address;
    this.version = dto.version;
    this.slashPoints = dto.slash_points;
    this.jail = {
      nodeAddress: dto.jail.node_address,
      releaseHeight : dto.jail.release_height,
      reason : dto.jail.reason,
    };
    this.currentAward = dto.current_award;
    this.error = dto.error;

    if (environment.production){
      this.location = dto.location;
    }else{
      // Test location data
      this.location = sampleLocation;
    }
  }
}
