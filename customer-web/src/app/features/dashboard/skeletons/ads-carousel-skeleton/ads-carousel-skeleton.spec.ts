import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsCarouselSkeleton } from './ads-carousel-skeleton';

describe('AdsCarouselSkeleton', () => {
  let component: AdsCarouselSkeleton;
  let fixture: ComponentFixture<AdsCarouselSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdsCarouselSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(AdsCarouselSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
