export interface PoolMember {
    asset: string;
    rune_address: string;
    asset_address: string;
    last_stake: string; // will change to last_deposit
    last_unstake: string; // will change to last_withdraw
    units: string;
    pending_rune: string;
    pending_tx_id: string;
}
