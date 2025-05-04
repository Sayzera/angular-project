import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavLinksComponent } from './nav-links/nav-links.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [RouterModule, NavLinksComponent],
})
export class NavbarComponent {}
