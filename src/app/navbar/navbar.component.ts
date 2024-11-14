import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { UserServiceService } from '../../app/services/user_services/user-service.service';  // Import your user service
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
            <!-- Conditionally render image or first letter of user's name -->
            <ng-container *ngIf="userProfile.avatar; else fallbackAvatar">
              <img [src]="userProfile.avatar" alt="User Avatar" class="h-10 w-10 rounded-full">
            </ng-container>
            <ng-template #fallbackAvatar>
              <div 
                class="h-10 w-10 rounded-full flex items-center justify-center text-white" 
                [ngStyle]="{'background-color': randomColor}">
                {{ userProfile.name ? userProfile.name.charAt(0).toUpperCase() : '?' }}
              </div>
            </ng-template>
            <span class="text-black">{{ userProfile.name }}</span>
          </a>
        </div>
      </div>
    </nav>
  `,
  styleUrls: ['./navbar.component.css'],
  imports: [RouterModule, CommonModule] // Add RouterModule here
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
  randomColor: string = '';

  constructor(private user_service: UserServiceService) {}

  async ngOnInit() {
    try {
      this.userProfile = await this.user_service.getUserProfile();  // Await the Promise to get the user profile
      this.generateRandomColor(); // Generate random color if no avatar is available
    } catch (error) {
      console.error('Error fetching user profile:', error);  // Handle any errors
    }
  }

  // Generate a random color for the fallback avatar
  generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    this.randomColor = color;
  }
}
