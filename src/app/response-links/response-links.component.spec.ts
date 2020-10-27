import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseLinksComponent } from './response-links.component';

describe('ResponseLinksComponent', () => {
  let component: ResponseLinksComponent;
  let fixture: ComponentFixture<ResponseLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponseLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
