import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PoolStakersComponent } from './pool-stakers.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('PoolStakersComponent', () => {
  let component: PoolStakersComponent;
  let fixture: ComponentFixture<PoolStakersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolStakersComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            parent: {
              paramMap: of(convertToParamMap({pool: 'BNB.AVA-ADF'}))
            }
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolStakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
