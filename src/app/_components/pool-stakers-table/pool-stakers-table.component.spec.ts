import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolStakersTableComponent } from './pool-stakers-table.component';

describe('PoolStakersTableComponent', () => {
  let component: PoolStakersTableComponent;
  let fixture: ComponentFixture<PoolStakersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolStakersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolStakersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
