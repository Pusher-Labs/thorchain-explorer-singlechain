import { Component, OnInit, Input } from '@angular/core';
import { IconDefinition, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  @Input() message: string;
  alertIcon: IconDefinition;

  constructor() {
    this.alertIcon = faExclamationTriangle;
  }

  ngOnInit(): void {
  }

}
