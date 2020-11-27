import { Component, OnInit } from '@angular/core';
import { IconDefinition, faReddit, faGitlab, faTelegram, faDiscord, faMedium, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { THORChainNetwork, ThorchainNetworkService } from './_services/thorchain-network.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  twitterIcon: IconDefinition;
  redditIcon: IconDefinition;
  gitlabIcon: IconDefinition;
  telegramIcon: IconDefinition;
  discordIcon: IconDefinition;
  mediumIcon: IconDefinition;

  constructor(private thorchainNetworkService: ThorchainNetworkService) {
    this.twitterIcon = faTwitter;
    this.redditIcon = faReddit;
    this.gitlabIcon = faGitlab;
    this.telegramIcon = faTelegram;
    this.discordIcon = faDiscord;
    this.mediumIcon = faMedium;
  }

  ngOnInit() { }

  setNetwork() {

    switch (environment.network) {
      case 'TESTNET':
        this.thorchainNetworkService.setNetwork(THORChainNetwork.TESTNET);
        break;

      case 'MULTICHAIN_TESTNET':
        this.thorchainNetworkService.setNetwork(THORChainNetwork.MULTICHAIN_TESTNET);
        break;

      default:
        this.thorchainNetworkService.setNetwork(THORChainNetwork.CHAOSNET);
        break;
    }

  }

}
