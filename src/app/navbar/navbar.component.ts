import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { UserServiceService } from '../../app/services/user_services/user-service.service';  // Import your user service~
import { UserProfile } from '../profile/profile.component';

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
            <a class="hover:text-white-300" routerLink="/games">Play Games</a>
            <ul class="dropdown absolute hidden bg-black text-white rounded-lg shadow-md">
              <li><a class="hover:text-white-300" routerLink="/Play Later">Play Later</a></li>
              <li><a class="hover:text-white-300" routerLink="/Currently Playing">Playing Now</a></li>
              <li><a class="hover:text-white-300" routerLink="/Played">Played Games</a></li>
              <li><a class="hover:text-white-300" routerLink="/Completed">Completed Games</a></li>
            </ul>
          </li>

          <li><a class="hover:text-white-300" routerLink="/coming-soon">About</a></li>
        </ul>
        
        <!-- User avatar and name -->
        <div class="user-profile flex items-center space-x-2">
          <a [routerLink]="'/profile'" class="flex items-center space-x-2">
            <img [src]="userProfile.avatar" alt="User Avatar" class="h-10 w-10 rounded-full">
            <span class="text-black">{{ userProfile.name }}</span>
          </a>
        </div>
      </div>
    </nav>
  `,
  styleUrls: ['./navbar.component.css'],
  imports: [RouterModule] // Add RouterModule here
})
export class NavbarComponent implements OnInit {

  userProfile: UserProfile = {
    id: '',
    name: '',
    email: '',
    password: '',
    avatar: '',
    lists: []
  };

  constructor(private user_service: UserServiceService) {}

  async ngOnInit() {
    try {
      this.userProfile = await this.user_service.getUserProfile();  // Await the Promise to get the games
    } catch (error) {
      console.error('Error fetching games:', error);  // Handle any errors
    }
  }
}
