import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesAteliersComponent } from './mes-ateliers.component';

describe('MesAteliersComponent', () => {
  let component: MesAteliersComponent;
  let fixture: ComponentFixture<MesAteliersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MesAteliersComponent]
    });
    fixture = TestBed.createComponent(MesAteliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
