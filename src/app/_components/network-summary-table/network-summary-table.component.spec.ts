import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkSummaryTableComponent } from './network-summary-table.component';

describe('NetworkSummaryTableComponent', () => {
  let component: NetworkSummaryTableComponent;
  let fixture: ComponentFixture<NetworkSummaryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkSummaryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkSummaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
