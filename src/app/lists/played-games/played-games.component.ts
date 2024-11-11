import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';  // Add HttpClientModule here
import { CommonModule } from '@angular/common';
import { GameCardComponent } from '../../game-card/game-card.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Game } from '../../games/games.component';


@Component({
  selector: 'app-played-games',
  standalone: true,
  template: `
  <app-navbar></app-navbar>
  <div class="stars"></div> <!-- Stars background here -->
  <div class="content">
    <h1 class="text-3xl font-bold text-white text-center">Games</h1>
    <div class="cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <app-game-card 
        *ngFor="let game of games" 
        [title]="game.title" 
        [thumbnail]="game.thumbnail"
        [shortDescription]="game.shortDescription"
        (click)="onCardClick(game)">
      </app-game-card>
    </div>
  </div>
`,
styleUrls: ['./played-games.component.css'],
imports: [
  CommonModule, 
  HttpClientModule, 
  GameCardComponent, 
  NavbarComponent
],
})
export class PlayedGamesComponent implements OnInit {
  games: Game[] = [];

  private colors = ['#1a202c', '#2d3748', '#4a5568', '#718096', '#edf2f7'];
  private currentIndex = 0;

  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  onCardClick(game: Game): void {
    // Navigate to the details page with the constellation data passed in the state
    this.router.navigate(['/games', game.id]);
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.createStars(100); // Create stars
      this.startBackgroundAnimation(); // Start the background color change
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
    // Set the body background color and manage transitions
    const body = document.body;

    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.colors.length;
      body.style.transition = 'background-color 1s ease-in-out'; // Fade effect
      body.style.backgroundColor = this.colors[this.currentIndex];
    }, 2000); // Change color every 2 seconds
  }
}
