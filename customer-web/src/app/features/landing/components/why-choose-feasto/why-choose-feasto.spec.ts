import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyChooseFeasto } from './why-choose-feasto';

describe('WhyChooseFeasto', () => {
  let component: WhyChooseFeasto;
  let fixture: ComponentFixture<WhyChooseFeasto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyChooseFeasto],
    }).compileComponents();

    fixture = TestBed.createComponent(WhyChooseFeasto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
