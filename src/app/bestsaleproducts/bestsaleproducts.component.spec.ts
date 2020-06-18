import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestsaleproductsComponent } from './bestsaleproducts.component';

describe('BestsaleproductsComponent', () => {
  let component: BestsaleproductsComponent;
  let fixture: ComponentFixture<BestsaleproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestsaleproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestsaleproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
