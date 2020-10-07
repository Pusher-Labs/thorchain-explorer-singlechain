import { Component, OnInit, OnDestroy } from '@angular/core';
import { PoolMember } from 'src/app/_classes/pool-member';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PoolMemberService } from 'src/app/_services/pool-member.service';
import { Subscription } from 'rxjs';
import { ThorchainNetworkService } from 'src/app/_services/thorchain-network.service';

@Component({
  selector: 'app-pool-members',
  templateUrl: './pool-members.component.html',
  styleUrls: ['./pool-members.component.scss']
})
export class PoolMembersComponent implements OnInit, OnDestroy {

  members: PoolMember[];
  totalCount: number;
  poolName: string;
  subs: Subscription[];
  error: boolean;

  constructor(
    private route: ActivatedRoute,
    private poolMemberService: PoolMemberService,
    private router: Router,
    private thorchainNetworkService: ThorchainNetworkService) {
      const network$ = this.thorchainNetworkService.networkUpdated$.subscribe(
        (_) => {

          this.members = null;
          this.getPoolMembers();

        }
      );

      this.subs = [network$];

  }

  ngOnInit(): void {

    const params$ = this.route.parent.paramMap.subscribe( async (params) => {
      this.poolName = params.get('pool');
      this.getPoolMembers();
    });

    this.subs.push(params$);

  }

  async getPoolMembers() {
    this.error = false;
    this.poolMemberService.findAll(this.poolName).subscribe(
      (res) => {
          if (res){
              this.members = res;
              this.error = false;
          }else{
              // Because on 404 issues the api returns null
              // so need to check for null and raise error here
              this.error = true;
          }
      },
      (err) => {
        console.error('err is: ', err);
        this.error = true;
      }
    );
  }

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

}
