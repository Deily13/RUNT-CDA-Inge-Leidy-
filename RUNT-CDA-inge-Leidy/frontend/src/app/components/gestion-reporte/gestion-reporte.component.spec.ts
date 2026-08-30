import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionReporte } from './gestion-reporte.component';

describe('GestionReporte', () => {
  let component: GestionReporte;
  let fixture: ComponentFixture<GestionReporte>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionReporte],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionReporte);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
