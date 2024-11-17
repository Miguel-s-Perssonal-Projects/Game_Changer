import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { count, map, Observable } from 'rxjs';
import { Game } from '../../games/games.component';
import { UserServiceService } from '../user_services/user-service.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class GameServiceService {
  games: Game[] = [];

  private gamesUrl = 'http://localhost:3000/gamesList'; // URL to fetch all games
  private gamesDetailsUrl = 'http://localhost:3000/gameDetails'; // URL to fetch all games
  private gamesGenresUrl = 'http://localhost:3000/genres'; // URL to fetch all games
  private gamesPlatformsUrl = 'http://localhost:3000/platforms'; // URL to fetch all games

  constructor(private router: Router,private http: HttpClient, private user_service: UserServiceService) { }

  getGamesHttp(): Observable<any> {
    return this.http.get("http://localhost:3000/gamesList");
  }
 
  async getGames(): Promise<any> {
    try {
      const data = await this.getGamesHttp().toPromise();  // Convert Observable to Promise
      return data;
    } catch (error) {
      console.error('Algo correu mal: ', error);
      throw error;  // Propagate error if necessary
    }
  }

  // Fetch all games from the backend
  getAllGames(): Observable<any[]> {
    return this.http.get<any[]>(this.gamesUrl); // Assuming this endpoint returns an array of games
  }

  // Fetch all games from the backend
  getAllGamesGenres(): Observable<any[]> {
    return this.http.get<any[]>(this.gamesGenresUrl); // Assuming this endpoint returns an array of games
  }

  // Fetch all games from the backend
  getAllGamesPlatforms(): Observable<any[]> {
    return this.http.get<any[]>(this.gamesPlatformsUrl); // Assuming this endpoint returns an array of games
  }

  // Fetch all games from the backend
  getAllGamesDetails(): Observable<any[]> {
    return this.http.get<any[]>(this.gamesDetailsUrl); // Assuming this endpoint returns an array of games
  }

  // Fetch a single game by its ID
  getGameById(gameId: string): Observable<any | undefined> {
    return this.getAllGames().pipe(
      map((games) => games.find((game) => game.id === gameId)) // Use find() to get a single game
    );
  }

  // Fetch a single game by its ID
  getGameDetailsById(gameId: string): Observable<any | undefined> {
    return this.getAllGamesDetails().pipe(
      map((games) => games.find((game) => game.id === gameId)) // Use find() to get a single game
    );
  }

  // Fetch multiple games by their IDs
  getGamesByIds(gameIds: string[]): Observable<any[]> {
    return this.getAllGames().pipe(
      map((games) => games.filter((game) => gameIds.includes(game.id)))
    );
  }

  // Function to fetch games based on a specific list (like 'Play Later', 'Now Playing', etc.)
  async getGamesForList(listName: string): Promise<any> {
    try {
      const profile = await this.user_service.getUserProfile();
      //console.log(profile['lists']);
      const list = profile['lists'].find((list: any) => list['name'] === listName);
      //console.log(list['gamesIds']);
  
      if (!list) {
        throw new Error(`${listName} not found in profile`);
      }
  
      const games = await this.getGamesByIds(list['gamesIds']).toPromise();
      console.log(games);
      return games;
    } catch (error) {
      console.error('Error fetching games for the list:', error);
      this.games = [];  // Reset games in case of error
    }
  }

  // Function to add a game to a specific list within the user's profile
  async addGameToList(gameId: string, listName: string): Promise<void> {
    try {
      // Fetch the user's profile
      const profile = await this.user_service.getUserProfile();

      // Find the specific list within the user's profile
      const list = profile['lists'].find((list: any) => list['name'] === listName);

      if (!list) {
        throw new Error(`List '${listName}' not found in profile.`);
      }

      // Add the game to the found list (check if it's already there to avoid duplicates)
      if (!list['gamesIds'].includes(gameId)) {
        list['gamesIds'].push(gameId);
      }

      // Update the profile with the modified list
      await this.user_service.updateProfile(profile).toPromise();
      console.log(`${gameId} has been added to the ${listName} list.`);
      // this.router.navigate([listName]);

    } catch (error) {
      console.error('Error adding game to list:', error);
      throw error; // Propagate the error to the component for further handling (e.g., showing an alert)
    }
  }

  // Function to remove a game from a specific list within the user's profile
async removeGameFromList(gameId: string, listName: string): Promise<void> {
  try {
    // Fetch the user's profile
    const profile = await this.user_service.getUserProfile();

    // Find the specific list within the user's profile
    const list = profile['lists'].find((list: any) => list['name'] === listName);

    if (!list) {
      throw new Error(`List '${listName}' not found in profile.`);
    }

    // Remove the game from the list (check if it's present first)
    const gameIndex = list['gamesIds'].indexOf(gameId);
    if (gameIndex > -1) {
      list['gamesIds'].splice(gameIndex, 1); // Remove the game from the list
    } else {
      console.log(`${gameId} is not in the ${listName} list.`);
      return; // If the game isn't in the list, exit early
    }

    // Update the profile with the modified list
    await this.user_service.updateProfile(profile).toPromise();
    console.log(`${gameId} has been removed from the ${listName} list.`);

    // Optionally navigate to the updated list
    // this.router.navigate([listName]);

  } catch (error) {
    console.error('Error removing game from list:', error);
    throw error; // Propagate the error for further handling in the component (e.g., showing an alert)
  }
}

  
 
  // getGame(id: string): Observable <any> {
  //   return this.http.get("http://localhost:3000/gamesList/").subscribe().data.lists.map(list => list.id);;
 
  // }
}
