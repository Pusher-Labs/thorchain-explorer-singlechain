import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxDetailTableDataComponent } from './tx-detail-table-data.component';

describe('TxDetailTableDataComponent', () => {
  let component: TxDetailTableDataComponent;
  let fixture: ComponentFixture<TxDetailTableDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxDetailTableDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxDetailTableDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
