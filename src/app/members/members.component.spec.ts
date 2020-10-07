import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StakersComponent } from './members.component';

describe('StakersComponent', () => {
  let component: StakersComponent;
  let fixture: ComponentFixture<StakersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StakersComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
