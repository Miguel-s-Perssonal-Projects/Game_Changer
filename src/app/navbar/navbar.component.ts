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
          <li><a class="hover:text-white-300" routerLink="/games">Game List</a></li>
          
          <!-- Dropdown for the Play Later section -->
          <li class="relative">
            <a class="hover:text-white-300" href="#">Play Games</a>
            <ul class="dropdown absolute hidden bg-black text-white rounded-lg shadow-md">
              <li><a class="hover:text-white-300" routerLink="/late-play-games">Play Later</a></li>
              <li><a class="hover:text-white-300" routerLink="/now-play-games">Playing Now</a></li>
              <li><a class="hover:text-white-300" routerLink="/played-games">Played Games</a></li>
              <li><a class="hover:text-white-300" routerLink="/finished-games">Completed Games</a></li>
            </ul>
          </li>

          <li><a class="hover:text-white-300" routerLink="/coming-soon">About</a></li>
        </ul>
        
        <!-- User avatar and name -->
        <div class="user-profile flex items-center space-x-2">
          <a [routerLink]="'/profile'" class="flex items-center space-x-2">
            <img src="assets/images/avatar.png" alt="User Avatar" class="h-10 w-10 rounded-full">
            <span class="text-black">User Name</span>
          </a>
        </div>
      </div>
    </nav>

  `,
  styleUrls: ['./navbar.component.css'],
  imports: [RouterModule] // Add RouterModule here
})
export class NavbarComponent {}
