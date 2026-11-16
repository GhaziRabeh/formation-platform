import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAtelierComponent } from './edit-atelier.component';

describe('EditAtelierComponent', () => {
  let component: EditAtelierComponent;
  let fixture: ComponentFixture<EditAtelierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditAtelierComponent]
    });
    fixture = TestBed.createComponent(EditAtelierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
