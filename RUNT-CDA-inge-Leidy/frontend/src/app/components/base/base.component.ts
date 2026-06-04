import { Component, ViewEncapsulation } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css',
  encapsulation: ViewEncapsulation.None
})
export class Base {
  isDrawerOpen = false;

  constructor(private router: Router) { }

  toggleDrawer() { this.isDrawerOpen = !this.isDrawerOpen; }
  closeDrawer() { this.isDrawerOpen = false; }

  goHome() {
    this.closeDrawer();
    this.router.navigate(['/base/vista-principal']);
  }

  logout() {
    this.closeDrawer();
    this.router.navigate(['/login']);
  }

  onSearch() {
    this.closeDrawer();
    this.router.navigate(['/base/panel-busqueda']);
  }

  onNew() {
    this.closeDrawer();
    this.router.navigate(['/base/formulario-data/nuevo']);
  }
  onUpdate() {
    this.closeDrawer();
    this.router.navigate(['/base/formulario-data/actualizar']);
  }

}