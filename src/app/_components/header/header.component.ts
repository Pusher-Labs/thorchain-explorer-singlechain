import { Component, OnInit, OnDestroy } from '@angular/core';
import { NetworkService } from 'src/app/_services/network.service';
import { IconDefinition, faExclamationCircle, faExclamationTriangle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { UiStyleToggleService } from '../../_services/ui-style-toggle.service';
import { ThorchainNetworkService } from 'src/app/_services/thorchain-network.service';
import { Subscription } from 'rxjs';

enum NetworkSecurityStatus {
  INEFFICIENT = 'Inefficient',
  OVERBONDED = 'Overbonded',
  OPTIMAL = 'Optimal',
  UNDERBONDED = 'Underbonded',
  INSECURE = 'Insecure',
  DOWN = 'Down'
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  optimalIcon: IconDefinition;
  warningIcon: IconDefinition;
  alertIcon: IconDefinition;
  checking: boolean;
  theme: string;
  networkSecurity: number;
  networkSecurityStatus: NetworkSecurityStatus;
  subs: Subscription[];

  constructor(
    private networkService: NetworkService,
    private uiStyleToggleService: UiStyleToggleService,
    private thorchainNetworkService: ThorchainNetworkService) {
      this.optimalIcon = faCheckCircle;
      this.warningIcon = faExclamationCircle;
      this.alertIcon = faExclamationTriangle;
      this.theme = localStorage.getItem('THEME');

      const network$ = this.thorchainNetworkService.networkUpdated$.subscribe(
        (_) => {
          this.getNetworkStatus();
        }
      );

      this.subs = [network$];

  }

  ngOnInit(): void {
    this.getNetworkStatus();
  }

  getNetworkStatus() {
    this.networkService.network().subscribe(
      (res) => {

        // Network is running, set security status
        if (res.activeNodeCount > 0) {

          const activeBond = +res.bondMetrics.totalActiveBond;

          this.networkSecurity = activeBond / (activeBond + Number(res.totalStaked));

          this.setNetworkSecurityStatus();

        // All Nodes are Down
        } else {

          this.networkSecurityStatus = NetworkSecurityStatus.DOWN;

        }

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

  toggleTheme() {
    this.uiStyleToggleService.toggle();
    this.checkTheme();
  }

  checkTheme() {
    if (localStorage.getItem('THEME') === 'DARK') {
      this.theme = 'DARK';
    }
    if (localStorage.getItem('THEME') === 'LIGHT') {
      this.theme = 'LIGHT';
    }
  }

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

}
