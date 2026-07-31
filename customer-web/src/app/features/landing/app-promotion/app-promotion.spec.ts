import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPromotion } from './app-promotion';

describe('AppPromotion', () => {
  let component: AppPromotion;
  let fixture: ComponentFixture<AppPromotion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPromotion],
    }).compileComponents();

    fixture = TestBed.createComponent(AppPromotion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
