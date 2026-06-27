import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  showError = false;
  accessGranted = false;

  private readonly DEMO_EMAIL = 'admin@empresa.com';
  private readonly DEMO_PASS = 'password123';

  constructor(private router: Router) { }

  handleLogin(): void {
    this.showError = false;
    this.errorMessage = '';

    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'Por favor, completa todos los campos antes de continuar.';
      this.showError = true;
      return;
    }

    if (this.email !== this.DEMO_EMAIL || this.password !== this.DEMO_PASS) {
      this.errorMessage = 'Las credenciales ingresadas son incorrectas. Por favor, verifícalas e inténtalo nuevamente.';
      this.showError = true;
    } else {
      this.accessGranted = true;
      setTimeout(() => this.router.navigate(['/app']), 800);
    }
  }
}

