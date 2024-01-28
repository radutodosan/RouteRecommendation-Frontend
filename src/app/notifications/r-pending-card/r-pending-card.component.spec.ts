import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RPendingCardComponent } from './r-pending-card.component';

describe('RPendingCardComponent', () => {
  let component: RPendingCardComponent;
  let fixture: ComponentFixture<RPendingCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RPendingCardComponent]
    });
    fixture = TestBed.createComponent(RPendingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
