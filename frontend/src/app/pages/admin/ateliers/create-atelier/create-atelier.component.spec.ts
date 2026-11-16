import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAtelierComponent } from './create-atelier.component';

describe('CreateAtelierComponent', () => {
  let component: CreateAtelierComponent;
  let fixture: ComponentFixture<CreateAtelierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateAtelierComponent]
    });
    fixture = TestBed.createComponent(CreateAtelierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
