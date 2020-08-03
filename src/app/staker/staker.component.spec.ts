import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StakerComponent } from './staker.component';

describe('StakerComponent', () => {
  let component: StakerComponent;
  let fixture: ComponentFixture<StakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StakerComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ]
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
