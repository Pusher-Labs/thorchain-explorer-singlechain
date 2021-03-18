import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetLogoComponent } from './asset-logo.component';

describe('AssetLogoComponent', () => {
  let component: AssetLogoComponent;
  let fixture: ComponentFixture<AssetLogoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
