import { Component, OnInit, OnDestroy } from '@angular/core';
import { MemberService } from '../_services/member.service';
import { ThorchainNetworkService } from '../_services/thorchain-network.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit, OnDestroy {

  members: string[];
  subs: Subscription[];
  error: string;

  constructor(private memberService: MemberService, private thorchainNetworkService: ThorchainNetworkService) {
    const network$ = this.thorchainNetworkService.networkUpdated$.subscribe(
      (_) => {
        this.getMembers();
      }
    );

    this.subs = [network$];
  }

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers(): void {
    this.members = null;
    this.error = null;

    this.memberService.findAll().subscribe(
      (res) => this.members = res,
      (err) => {
        console.error('error fetching members: ', err);
        this.error = 'Could not fetch members';
      }
    );
  }

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

}
