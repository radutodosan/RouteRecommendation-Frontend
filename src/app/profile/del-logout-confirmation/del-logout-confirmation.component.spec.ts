import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelLogoutConfirmationComponent } from './del-logout-confirmation.component';

describe('DelLogoutConfirmationComponent', () => {
  let component: DelLogoutConfirmationComponent;
  let fixture: ComponentFixture<DelLogoutConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DelLogoutConfirmationComponent]
    });
    fixture = TestBed.createComponent(DelLogoutConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
