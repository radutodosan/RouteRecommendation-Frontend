import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveConfirmationComponent } from './remove-confirmation.component';

describe('RemoveConfirmationComponent', () => {
  let component: RemoveConfirmationComponent;
  let fixture: ComponentFixture<RemoveConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveConfirmationComponent]
    });
    fixture = TestBed.createComponent(RemoveConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
