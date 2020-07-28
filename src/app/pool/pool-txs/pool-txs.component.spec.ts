import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolTxsComponent } from './pool-txs.component';

describe('PoolTxsComponent', () => {
  let component: PoolTxsComponent;
  let fixture: ComponentFixture<PoolTxsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolTxsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolTxsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
