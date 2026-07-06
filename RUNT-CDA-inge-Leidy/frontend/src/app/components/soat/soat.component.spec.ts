import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Soat } from './soat.component';

describe('Soat', () => {
  let component: Soat;
  let fixture: ComponentFixture<Soat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Soat],
    }).compileComponents();

    fixture = TestBed.createComponent(Soat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
