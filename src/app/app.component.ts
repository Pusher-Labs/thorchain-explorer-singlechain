import { Component, OnInit } from '@angular/core';
import { IconDefinition, faReddit, faGitlab, faTelegram, faDiscord, faMedium, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { NodeService } from './_services/node.service';
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

  constructor(private nodeService: NodeService) {
    this.twitterIcon = faTwitter;
    this.redditIcon = faReddit;
    this.gitlabIcon = faGitlab;
    this.telegramIcon = faTelegram;
    this.discordIcon = faDiscord;
    this.mediumIcon = faMedium;
  }

  ngOnInit() {

    this.nodeService.corsTest().subscribe(
      (res) => console.log('cors test res is: ', res),
      (err) => console.error('cors test err is: ', err)
    );

    this.nodeService.corsTest2().subscribe(
      (res) => console.log('222 res is: ', res),
      (err) => console.error('222 err is: ', err)
    );

    console.log('is production? ', environment.production);
    console.log('thornode url is: ', environment.thorNodeUrl);

  }

}
