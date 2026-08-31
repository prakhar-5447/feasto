import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantListSkeleton } from './restaurant-list-skeleton';

describe('RestaurantListSkeleton', () => {
  let component: RestaurantListSkeleton;
  let fixture: ComponentFixture<RestaurantListSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantListSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantListSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
