import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Base } from './base.component';
import { RouterOutlet } from '@angular/router';

describe('Base', () => {
  let component: Base;
  let fixture: ComponentFixture<Base>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Base, RouterOutlet],
    }).compileComponents();

    fixture = TestBed.createComponent(Base);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
