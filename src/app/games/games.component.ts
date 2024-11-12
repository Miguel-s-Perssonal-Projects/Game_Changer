import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';  // Add HttpClientModule here
import { CommonModule } from '@angular/common';
import { GameCardComponent } from '../game-card/game-card.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { NavbarComponent } from '../navbar/navbar.component';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GameServiceService } from '../../app/services/game_services/game-service.service'

export interface Game {
  id: string,
  title: string,
  thumbnail: string,
  status: string,
  shortDescription: string,
  description: string,
  gameUrl: string,
  genre: string,
  platform: string,
  publisher: string,
  developer: string,
  releaseDate: string,
  freetogameProfileUrl: string,
  minimumSystemRequirements: SystemRequirements,
  screenshots: Screenshot[]
}

export interface SystemRequirements {
  os: string,
  processor: string,
  memory: string,
  graphics: string,
  storage: string
}

export interface Screenshot {
  id: string,
  image: string
}

@Component({
  selector: 'app-games',
  standalone: true,
  template: `
    <app-navbar></app-navbar>
    <div class="stars"></div> <!-- Stars background here -->
    <div class="content">
      <h1 class="text-3xl font-bold text-white text-center">Games</h1>
      <!-- Search Bar -->
      <div class="search-container">
        <input 
          type="text" 
          [(ngModel)]="searchQuery" 
          placeholder="Search games..." 
          class="search-input" 
          (input)="onSearch()"
        />
      </div>
      <div class="cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <app-game-card 
          *ngFor="let game of filteredGames" 
          [title]="game.title" 
          [thumbnail]="game.thumbnail"
          [shortDescription]="game.shortDescription"
          (click)="onCardClick(game)">
        </app-game-card>
      </div>
    </div>
  `,
  styleUrls: ['./games.component.css'],
  imports: [
    CommonModule, 
    HttpClientModule, 
    GameCardComponent,
    FormsModule,
    NavbarComponent
  ],
})
export class GamesComponent implements OnInit {
  games: Game[] = [];
  filteredGames: Game[] = [];
  searchQuery: string = ''; // Holds the search query input by the user

  // Spectrum of greens and black shades
  private colors = [
    '#0a0f0a', // Dark green-black
    '#1d2b1d', // Dark forest green
    '#2e4532', // Medium green
    '#415b41', // Slightly lighter green
    '#537d4e', // Lush green
    '#6c9a60', // Light green
    '#87b374', // Greenish tint
    '#a3c08e', // Pale green
    '#4b4d45'  // Charcoal green-black
  ];
  private currentIndex = 0;

  constructor(private http: HttpClient, private router: Router, private game_service: GameServiceService, @Inject(PLATFORM_ID) private platformId: Object) {}

  onCardClick(game: Game): void {
    // Navigate to the details page with the game id
    this.router.navigate(['/games', game.id]);
  }

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.createStars(5); // Create stars
      this.startBackgroundAnimation(); // Start the background color change
    }
    try {
      this.games = await this.game_service.getGames();  // Await the Promise to get the games
      this.filteredGames = this.games.filter(game => game.title); // Initially, display all games
    } catch (error) {
      console.error('Error fetching games:', error);  // Handle any errors
    }
  }

  onSearch(): void {
    if (this.searchQuery) {
      this.filteredGames = this.games.filter(game => {
        // Only filter games that have a valid title
        if (!game.title) {
          return false; // Exclude games without a title
        }
  
        const title = game.title.toLowerCase();
        const shortDescription = game.shortDescription ? game.shortDescription.toLowerCase() : '';
        const genre = game.genre ? game.genre.toLowerCase() : '';
        const developer = game.developer ? game.developer.toLowerCase() : '';
  
        return title.includes(this.searchQuery.toLowerCase()) || 
               shortDescription.includes(this.searchQuery.toLowerCase()) || 
               genre.includes(this.searchQuery.toLowerCase()) ||
               developer.includes(this.searchQuery.toLowerCase()); // Add more fields as needed
      });
    } else {
      // If the search input is cleared, show all games
      this.filteredGames = this.games.filter(game => game.title); // Only include games with a title
    }
  }
  
  

  createStars(count: number) {
    const starsContainer = document.querySelector('.stars') as HTMLElement; // Type assertion
    
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.width = `${Math.random() * 3 + 1}px`; // Random size
      star.style.height = star.style.width; // Keep it circular
      star.style.top = `${Math.random() * 100}vh`;
      star.style.left = `${Math.random() * 100}vw`;
      star.style.opacity = Math.random().toString(); // Convert opacity to string
      
      starsContainer.appendChild(star);
    }
  }

  startBackgroundAnimation() {
    // Get the animated background div
    const animatedBackground = document.querySelector('.stars') as HTMLElement;

    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.colors.length;
      animatedBackground.style.transition = 'background-color 1s ease-in-out'; // Fade effect for background color
      animatedBackground.style.backgroundColor = this.colors[this.currentIndex];
    }, 10000); // Change color every 2 seconds
  }

}
