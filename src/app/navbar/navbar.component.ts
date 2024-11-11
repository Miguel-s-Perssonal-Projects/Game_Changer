import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <nav class="navbar">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <!-- Logo section -->
        <div class="logo">
          <a routerLink="/home">
            <img src="assets/images/logo.png" alt="Game Changer Logo" class="h-12">
          </a>
        </div>
        
        <!-- Navigation links -->
        <ul class="flex justify-center space-x-4">
          <li><a class="hover:text-white-300" routerLink="/home">Home</a></li>
          <li><a class="hover:text-white-300" routerLink="/coming-soon">Services</a></li>
          <li><a class="hover:text-white-300" routerLink="/coming-soon">About</a></li>
          <li><a class="hover:text-white-300" routerLink="/coming-soon">Contact</a></li>
          <li><a class="hover:text-white-300" routerLink="/games">Games</a></li>
        </ul>
      </div>
    </nav>
  `,
  styleUrls: ['./navbar.component.css'],
  imports: [RouterModule] // Add RouterModule here
})
export class NavbarComponent {}
