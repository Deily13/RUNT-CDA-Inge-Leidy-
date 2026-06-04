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

  logout() {
    this.closeDrawer();
    this.router.navigate(['/login']);
  }
}