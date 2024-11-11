import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../../games/games.component'


@Injectable({
  providedIn: 'root'
})
export class GameServiceService {
  games: Game[] = [];

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
 
  // getGame(id: string): Observable <any> {
  //   return this.http.get("http://localhost:3000/gamesList/").subscribe().data.lists.map(list => list.id);;
 
  // }
}
