import { Component, OnInit } from '@angular/core';
import { IconDefinition, faReddit, faGitlab, faTelegram, faDiscord, faMedium, faTwitter } from '@fortawesome/free-brands-svg-icons';

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

  constructor() {
    this.twitterIcon = faTwitter;
    this.redditIcon = faReddit;
    this.gitlabIcon = faGitlab;
    this.telegramIcon = faTelegram;
    this.discordIcon = faDiscord;
    this.mediumIcon = faMedium;
  }

  ngOnInit() { }

}
