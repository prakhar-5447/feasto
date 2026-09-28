import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantPicker } from './restaurant-picker';

describe('RestaurantPicker', () => {
  let component: RestaurantPicker;
  let fixture: ComponentFixture<RestaurantPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantPicker],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantPicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
