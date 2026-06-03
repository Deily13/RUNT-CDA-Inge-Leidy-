import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDataComponent } from './formulario-data.component';

describe('FormularioData', () => {
  let component: FormularioDataComponent;
  let fixture: ComponentFixture<FormularioDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
