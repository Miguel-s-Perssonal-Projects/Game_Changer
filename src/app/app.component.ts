import { Component } from '@angular/core';
import { AppRoutingModule } from './app.routes'; // Import your routing module
import { NavbarComponent } from './navbar/navbar.component'; // Import your Navbar component

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <router-outlet></router-outlet> <!-- This will display routed components -->
  `,
  imports: [AppRoutingModule, NavbarComponent], // Import the routing module here
})
export class AppComponent {}
