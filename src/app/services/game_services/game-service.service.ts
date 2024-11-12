import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { count, map, Observable } from 'rxjs';
import { Game } from '../../games/games.component'


@Injectable({
  providedIn: 'root'
})
export class GameServiceService {
  games: Game[] = [];

  private gamesUrl = 'http://localhost:3000/gamesList'; // URL to fetch all games
  private gamesDetailsUrl = 'http://localhost:3000/gameDetails'; // URL to fetch all games

  constructor(private http: HttpClient) { }

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

  getProfileHttp(): Observable<any> {
    return this.http.get("http://localhost:3000/profile");
  }

  async getUserProfile(): Promise<any> {
    try {
      const data = await this.getProfileHttp().toPromise();  // Convert Observable to Promise
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
      const profile = await this.getUserProfile();
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
  
 
  // getGame(id: string): Observable <any> {
  //   return this.http.get("http://localhost:3000/gamesList/").subscribe().data.lists.map(list => list.id);;
 
  // }
}
