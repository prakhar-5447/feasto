import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabReviews } from './tab-reviews';

describe('TabReviews', () => {
  let component: TabReviews;
  let fixture: ComponentFixture<TabReviews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabReviews],
    }).compileComponents();

    fixture = TestBed.createComponent(TabReviews);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
