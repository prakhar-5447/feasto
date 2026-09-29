import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedCards } from './saved-cards';

describe('SavedCards', () => {
  let component: SavedCards;
  let fixture: ComponentFixture<SavedCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedCards],
    }).compileComponents();

    fixture = TestBed.createComponent(SavedCards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
