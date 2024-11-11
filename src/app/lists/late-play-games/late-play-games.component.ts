import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';  // Add HttpClientModule here
import { CommonModule } from '@angular/common';
import { GameCardComponent } from '../../game-card/game-card.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Game } from '../../games/games.component';


@Component({
  selector: 'app-late-play-games',
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
styleUrls: ['./late-play-games.component.css'],
imports: [
  CommonModule, 
  HttpClientModule, 
  GameCardComponent, 
  NavbarComponent
],
})
export class LatePlayGamesComponent implements OnInit {
  games: Game[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // this.updateDatasets();
  }

  onCardClick(game: Game): void {
    // Navigate to the details page with the constellation data passed in the state
    this.router.navigate(['/games', game.id]);
  }


}
