import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkToggleComponent } from './network-toggle.component';

describe('NetworkToggleComponent', () => {
  let component: NetworkToggleComponent;
  let fixture: ComponentFixture<NetworkToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
