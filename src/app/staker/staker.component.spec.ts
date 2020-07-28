import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StakerComponent } from './staker.component';

describe('StakerComponent', () => {
  let component: StakerComponent;
  let fixture: ComponentFixture<StakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
