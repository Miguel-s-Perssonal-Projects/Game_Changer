import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; // Adjust the path as needed
import { GamesComponent } from './games/games.component';
import { NowPlayGamesComponent } from './lists/now-play-games/now-play-games.component';
import { LatePlayGamesComponent } from './lists/late-play-games/late-play-games.component';
import { FinishedGamesComponent } from './lists/finished-games/finished-games.component';
import { PlayedGamesComponent } from './lists/played-games/played-games.component';
import { GameDetailComponent } from './game-details/game-details.component';
import { ComingSoonComponent } from './comingsoon/comingsoon.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [ // Ensure routes are exported
  { path: '', component: HomeComponent }, // Default route
  { path: 'home', component: HomeComponent }, 
  { path: 'games', component: GamesComponent },
  { path: 'Played', component: PlayedGamesComponent },
  { path: 'Completed', component: FinishedGamesComponent },
  { path: 'Currently Playing', component: NowPlayGamesComponent },
  { path: 'Play Later', component: LatePlayGamesComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'games/:id', component: GameDetailComponent },
  { path: 'coming-soon', component: ComingSoonComponent },
  // Additional routes can be added here
];

@NgModule({
  imports: [RouterModule], // Only for the root module
  exports: [RouterModule]
})
export class AppRoutingModule {}
