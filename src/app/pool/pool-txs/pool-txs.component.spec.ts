import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PoolTxsComponent } from './pool-txs.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('PoolTxsComponent', () => {
  let component: PoolTxsComponent;
  let fixture: ComponentFixture<PoolTxsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolTxsComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            parent: {
              paramMap: of(convertToParamMap({pool: 'BNB.AVA-ADF'})),
              queryParamMap: of(convertToParamMap({offset: 0}))
            }
          }
        }
      ]
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
