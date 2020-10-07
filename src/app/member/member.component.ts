import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../_classes/member';
import { MemberService } from '../_services/member.service';
import { MemberPoolData } from '../_classes/member-pool-data';
import { ThorchainNetworkService } from '../_services/thorchain-network.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  member: Member;
  address: string;
  memberPoolsData: MemberPoolData[];
  subs: Subscription[];
  error: string;

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private thorchainNetworkService: ThorchainNetworkService) {
      const network$ = this.thorchainNetworkService.networkUpdated$.subscribe(
        (_) => {
          if (this.address) {
            this.fetchStaker(this.address);
          }
        }
      );

      this.subs = [network$];
    }

  ngOnInit(): void {

    this.route.paramMap.subscribe( (params) => {

      this.address = params.get('address');

      if (this.address) {
        this.fetchStaker(this.address);
      }

    });

  }

  fetchStaker(address: string) {
    this.member = null;
    this.error = null;

    this.memberService.findOne(address).subscribe(
      (res) => {
        this.member = new Member(res);
        if (this.member && this.member.poolsArray) {
          console.log('this member pools array is: ', this.member.poolsArray);
          this.fetchPoolsData(address, this.member.poolsArray);
        } else {
          this.error = 'Could not find member pools';
        }
      },
      (err) => {
        console.error('error finding member: ', err);
        this.error = 'Error fetching member';
      }
    );

  }

  fetchPoolsData(address: string, pools: string[]) {

    this.memberService.findMemberPoolData(address, pools).subscribe(
      (res) => this.memberPoolsData = res,
      (err) => {
        console.error('error finding member: ', err);
        this.error = 'Error fetching pools data';
      }
    );
  }

}
