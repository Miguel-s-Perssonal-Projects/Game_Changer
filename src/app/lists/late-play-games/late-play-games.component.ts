import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';  // Add HttpClientModule here
import { CommonModule } from '@angular/common';
import { GameCardComponent } from '../../game-card/game-card.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Game } from '../../games/games.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { GameServiceService } from '../../services/game_services/game-service.service';
import { Genre } from '../../games/games.component';
import { Platform } from '../../games/games.component';



@Component({
  selector: 'app-late-play-games',
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
      <!-- Genre and Platform Filters -->
      <div class="filter-container">
        <!-- Genre Dropdown -->
        <label for="genreFilter">Genre:</label>
        <select id="genreFilter" [(ngModel)]="selectedGenre" (change)="onFilterChange()">
          <option value="">All</option> <!-- Option to clear the filter -->
          <option *ngFor="let genre of genres" [value]="genre.name">{{ genre.name }}</option>
        </select>

        <!-- Platform Dropdown -->
        <label for="platformFilter">Platform:</label>
        <select id="platformFilter" [(ngModel)]="selectedPlatform" (change)="onFilterChange()">
          <option value="">All</option> <!-- Option to clear the filter -->
          <option *ngFor="let platform of platforms" [value]="platform.name">{{ platform.name }}</option>
        </select>
      </div>
      
      <!-- Game Cards Display -->
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
styleUrls: ['./late-play-games.component.css'],
imports: [
  CommonModule, 
  HttpClientModule, 
  GameCardComponent, 
  FormsModule,
  NavbarComponent
],
})
export class LatePlayGamesComponent implements OnInit {
  games: Game[] = [];
  filteredGames: Game[] = [];
  searchQuery: string = ''; // Holds the search query input by the user
  genres: Genre[] = [];
  platforms: Platform[] = [];
  selectedGenre: string = '';
  selectedPlatform: string = '';

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

  constructor(private http: HttpClient, private game_service: GameServiceService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  onCardClick(game: Game): void {
    // Navigate to the details page with the constellation data passed in the state
    this.router.navigate(['/games', game.id]);
  }

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.createStars(5); // Create stars
      this.startBackgroundAnimation(); // Start the background color change
    }

    try {
      this.games = await this.game_service.getGamesForList('Play Later');  // Await the Promise to get the games
      this.filteredGames = this.games; // Initially, display all games

      // Fetch genres and platforms
      this.fetchGenres();
      this.fetchPlatforms();
    } catch (error) {
      console.error('Error fetching games:', error);  // Handle any errors
    }
  }

  fetchGenres(): void {
    this.game_service.getAllGamesGenres().subscribe(
      (genres: any[]) => this.genres = genres,
      error => console.error('Error fetching genres:', error)
    );
  }

  fetchPlatforms(): void {
    this.game_service.getAllGamesPlatforms().subscribe(
      (platforms: any[]) => this.platforms = platforms,
      error => console.error('Error fetching platforms:', error)
    );
  }

  onSearch(): void {
    this.filterGames();
  }

  onFilterChange(): void {
    this.filterGames();
  }

  filterGames(): void {
    this.filteredGames = this.games.filter(game => {
      const matchesTitle = this.searchQuery ? game.title?.toLowerCase().includes(this.searchQuery.toLowerCase()) : true;
      const matchesGenre = this.selectedGenre ? game.genre === this.selectedGenre : true;
      const matchesPlatform = this.selectedPlatform ? game.platform === this.selectedPlatform : true;

      return matchesTitle && matchesGenre && matchesPlatform;
    });
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
    // Set the body background color and manage transitions
    const body = document.body;

    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.colors.length;
      body.style.transition = 'background-color 1s ease-in-out'; // Fade effect
      body.style.backgroundColor = this.colors[this.currentIndex];
    }, 10000); // Change color every 2 seconds
  }
}