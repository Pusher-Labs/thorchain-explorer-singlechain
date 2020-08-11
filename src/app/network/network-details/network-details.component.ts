import { Component, OnInit } from '@angular/core';
import { NetworkService, NetworkStatus } from 'src/app/_services/network.service';

@Component({
  selector: 'app-network-details',
  templateUrl: './network-details.component.html',
  styleUrls: ['./network-details.component.scss']
})
export class NetworkDetailsComponent implements OnInit {

  network: NetworkStatus;

  constructor(private networkService: NetworkService) { }

  ngOnInit(): void {
    this.getNetworkStatus();
  }

  getNetworkStatus(): void {
    this.networkService.network().subscribe(
      (res) => this.network = res,
      (err) => console.error('NetworkDetailsComponent -> error fetching network status: ', err)
    );
  }

}
