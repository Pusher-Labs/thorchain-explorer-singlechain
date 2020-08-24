export enum NodeStatus {
  ACTIVE = 'active',
  STANDBY = 'standby',
  DISABLED = 'disabled'
}

export interface ThorNode {
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
}
