import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component'; // Assuming Navbar component is used
import { Game } from '../games/games.component';

@Component({
  selector: 'app-game-details',
  template: `
    <app-navbar></app-navbar>
    <div class="game-background"></div> <!-- Optional background customization -->
    <div class="content">
      <div *ngIf="game" class="form-container">
        <h1 class="title">{{ game.title }}</h1>
        
        <form class="game-form">
          <div class="form-group">
            <label for="genre">Genre</label>
            <input id="genre" type="text" value="{{ game.genre }}" disabled>
          </div>
          <div class="form-group">
            <label for="platform">Platform</label>
            <input id="platform" type="text" value="{{ game.platform }}" disabled>
          </div>
          <div class="form-group">
            <label for="publisher">Publisher</label>
            <input id="publisher" type="text" value="{{ game.publisher }}" disabled>
          </div>
          <div class="form-group">
            <label for="developer">Developer</label>
            <input id="developer" type="text" value="{{ game.developer }}" disabled>
          </div>
          <div class="form-group">
            <label for="releaseDate">Release Date</label>
            <input id="releaseDate" type="text" value="{{ game.releaseDate }}" disabled>
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" disabled>{{ game.description }}</textarea>
          </div>
        </form>
        <div class="image-container">
          <img [src]="game.thumbnail" alt="{{ game.title }}" />
        </div>

        <!-- Display screenshots if available -->
        <div *ngIf="game.screenshot_1 || game.screenshot_2 || game.screenshot_3" class="screenshots">
          <h2>Screenshots</h2>
          <div class="screenshot-grid">
            <img *ngIf="game.screenshot_1" [src]="game.screenshot_1" alt="Screenshot 1" />
            <img *ngIf="game.screenshot_2" [src]="game.screenshot_2" alt="Screenshot 2" />
            <img *ngIf="game.screenshot_3" [src]="game.screenshot_3" alt="Screenshot 3" />
          </div>
        </div>

        <!-- Display system requirements if available -->
        <div *ngIf="game.system_requirements" class="system-requirements">
          <h2>System Requirements</h2>
          <ul>
            <li><strong>OS:</strong> {{ game.system_requirements.os }}</li>
            <li><strong>Processor:</strong> {{ game.system_requirements.processor }}</li>
            <li><strong>Memory:</strong> {{ game.system_requirements.memory }}</li>
            <li><strong>Graphics:</strong> {{ game.system_requirements.graphics }}</li>
            <li><strong>Storage:</strong> {{ game.system_requirements.storage }}</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./game-details.component.css'],
  standalone: true,
  imports: [CommonModule, NavbarComponent] // Import CommonModule to use ngIf
})
export class GameDetailComponent implements OnInit {
  game: Game | null = null;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID to check platform type
  ) {}

  ngOnInit() {
    // Only access history.state in the browser
    if (isPlatformBrowser(this.platformId)) {
      const state = history.state;

      if (state && state.title) { // Check for Game properties instead of constellation properties
        this.game = state as Game;
        // Optionally set a background image based on game data if desired
        document.body.style.backgroundImage = `url(${this.game.thumbnail})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
      } else {
        console.error('No game data found!');
      }
    }
  }
}
