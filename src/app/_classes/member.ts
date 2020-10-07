export class Member {
  poolsArray: string[];
  totalEarned: number;
  totalStaked: number;
  totalROI: number;

  constructor(dto: MemberDTO) {
    this.poolsArray = dto.poolsArray;
    this.totalEarned = +dto.totalEarned;
    this.totalStaked = +dto.totalStaked;
    this.totalROI = +dto.totalROI;
  }

}

export interface MemberDTO {
  poolsArray: string[];
  totalEarned: string;
  totalStaked: string;
  totalROI: string;
}
