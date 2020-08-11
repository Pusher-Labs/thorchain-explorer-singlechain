import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/_services/network.service';
import { IconDefinition, faExclamationCircle, faExclamationTriangle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

enum NetworkSecurityStatus {
  INEFFICIENT = 'Inefficient',
  OVERBONDED = 'Overbonded',
  OPTIMAL = 'Optimal',
  UNDERBONDED = 'Underbonded',
  INSECURE = 'Insecure'
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  optimalIcon: IconDefinition;
  warningIcon: IconDefinition;
  alertIcon: IconDefinition;

  networkSecurity: number;
  networkSecurityStatus: NetworkSecurityStatus;

  constructor(private networkService: NetworkService) {
    this.optimalIcon = faCheckCircle;
    this.warningIcon = faExclamationCircle;
    this.alertIcon = faExclamationTriangle;
  }

  ngOnInit(): void {
    this.getNetworkStatus();
  }

  getNetworkStatus() {
    this.networkService.network().subscribe(
      (res) => {
        const activeBond = +res.bondMetrics.totalActiveBond;
        this.networkSecurity = activeBond / (activeBond + Number(res.totalStaked));
        this.setNetworkSecurityStatus();
      },
      (err) => console.error('HeaderComponent -> error fetching network: ', err)
    );
  }

  setNetworkSecurityStatus() {

    if (0.9 <= this.networkSecurity) {
      this.networkSecurityStatus = NetworkSecurityStatus.INEFFICIENT;
    } else if (0.75 < this.networkSecurity && this.networkSecurity < 0.9) {
      this.networkSecurityStatus = NetworkSecurityStatus.OVERBONDED;
    } else if (0.60 <= this.networkSecurity && this.networkSecurity <= 0.75) {
      this.networkSecurityStatus = NetworkSecurityStatus.OPTIMAL;
    } else if (0.50 <= this.networkSecurity && this.networkSecurity < 0.60) {
      this.networkSecurityStatus = NetworkSecurityStatus.UNDERBONDED;
    } else if (this.networkSecurity < 0.50) {
      this.networkSecurityStatus = NetworkSecurityStatus.INSECURE;
    }

  }

}
