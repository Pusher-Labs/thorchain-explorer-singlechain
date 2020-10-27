import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-query-input',
  templateUrl: './query-input.component.html',
  styleUrls: ['./query-input.component.scss'],
})
export class QueryInputComponent implements OnInit {
  @Input() param;
  @Input() value;
  @Output() inputChanged = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  handleChange(event): void {
    this.inputChanged.emit({ event, param: this.param });
  }

  getPlaceholder(): string {
    if (this.param && this.param.example) {
      if (Array.isArray(this.param.example)) {
        return this.param.example[0];
      } else {
        return this.param.example;
      }
    }
    return '';
  }
}
