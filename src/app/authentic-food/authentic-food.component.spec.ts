import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticFoodComponent } from './authentic-food.component';

describe('AuthenticFoodComponent', () => {
  let component: AuthenticFoodComponent;
  let fixture: ComponentFixture<AuthenticFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
