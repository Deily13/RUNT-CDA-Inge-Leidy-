import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeCardComponent } from './mensaje.component';

describe('Mensaje', () => {
  let component: MensajeCardComponent;
  let fixture: ComponentFixture<MensajeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajeCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MensajeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
