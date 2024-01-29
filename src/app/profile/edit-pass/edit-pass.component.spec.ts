import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPassComponent } from './edit-pass.component';

describe('EditPassComponent', () => {
  let component: EditPassComponent;
  let fixture: ComponentFixture<EditPassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPassComponent]
    });
    fixture = TestBed.createComponent(EditPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
