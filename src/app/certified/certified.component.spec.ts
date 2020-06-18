import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifiedComponent } from './certified.component';

describe('CertifiedComponent', () => {
  let component: CertifiedComponent;
  let fixture: ComponentFixture<CertifiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertifiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
