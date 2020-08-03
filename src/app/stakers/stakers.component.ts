import { Component, OnInit } from '@angular/core';
import { StakerService } from '../_services/staker.service';

@Component({
  selector: 'app-stakers',
  templateUrl: './stakers.component.html',
  styleUrls: ['./stakers.component.scss']
})
export class StakersComponent implements OnInit {

  stakers: string[];

  constructor(private stakerService: StakerService) { }

  ngOnInit(): void {
    this.getStakers();
  }

  getStakers(): void {

    this.stakerService.findAll().subscribe(
      (res) => this.stakers = res,
      (err) => console.error('error fetching stakers: ', err)
    );
  }

}
