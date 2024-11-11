import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';  // Add HttpClientModule here
import { CommonModule } from '@angular/common';
import { GameCardComponent } from '../game-card/game-card.component';
import { NavbarComponent } from '../navbar/navbar.component';

export interface Game {
  id: String,
  title: String,
  thumbnail: String,
  status: String,
  shortDescription: String,
  description: String,
  gameUrl: String,
  genre: String,
  platform: String,
  publisher: String,
  developer: String,
  releaseDate: String,
  freetogameProfileUrl: String,
  screenshot_1: String,
  screenshot_2: String,
  screenshot_3: String,
  system_requirements: SystemRequirements
}

interface SystemRequirements {
  os: String,
  processor: String,
  memory: String,
  graphics: String,
  storage: String
}

@Component({
  selector: 'app-games',
  standalone: true,
  template: `
    <app-navbar></app-navbar>
    <div class="games-container">
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
  styleUrls: ['./games.component.css'],
  imports: [
    CommonModule, 
    HttpClientModule, 
    GameCardComponent, 
    NavbarComponent
  ],
})
export class GamesComponent implements OnInit {
  games: Game[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.updateDatasets();
  }

  updateDatasets() {
    this.http.get('http://localhost:5000/update-datasets').subscribe(
      () => {
        console.log('Datasets updated successfully');
        this.loadConstellations();
      },
      (error) => {
        console.error('Error updating datasets:', error);
      }
    );
  }

  loadConstellations() {
    this.http.get<Game[]>('http://localhost:5000/constellations').subscribe(
      (data) => {
        this.games = data;
      },
      (error) => {
        console.error('Error loading games:', error);
      }
    );
  }

  onCardClick(game: Game): void {
    // Navigate to the details page with the constellation data passed in the state
    this.router.navigate(['/games', game.id]);
  }
}
