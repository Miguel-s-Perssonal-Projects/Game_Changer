import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component'; // Assuming Navbar component is used
import { Game } from '../games/games.component';
import { ActivatedRoute } from '@angular/router';
import { GameServiceService } from '../../app/services/game_services/game-service.service';
import { UserList } from '../profile/profile.component';
import { UserServiceService } from '../services/user_services/user-service.service';
import { MatIconModule } from '@angular/material/icon';


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
            <div class="form-group">
              <label for="freetogameProfileUrl">Link to game</label>
              <textarea id="freetogameProfileUrl" disabled>{{ game.freetogameProfileUrl }}</textarea>
            </div>
          </form>

          <!-- Display screenshots if available -->
          <div *ngIf="game.screenshots[0].image || game.screenshots[1].image || game.screenshots[2].image" class="screenshots">
            <h2 class="screenshots-title">Screenshots</h2> <!-- Add custom class -->
            <div class="screenshot-grid">
              <img *ngIf="game.screenshots[0].image" [src]="game.screenshots[0].image" alt="Screenshot 1" />
              <img *ngIf="game.screenshots[1].image" [src]="game.screenshots[1].image" alt="Screenshot 2" />
              <img *ngIf="game.screenshots[2].image" [src]="game.screenshots[2].image" alt="Screenshot 3" />
            </div>
          </div>


          <!-- Display system requirements if available -->
          <div *ngIf="game.minimumSystemRequirements" class="system-requirements">
            <h2 class="screenshots-title">System Requirements</h2>
            <ul>
              <li class="screenshots-title"><strong>OS:</strong> {{ game.minimumSystemRequirements.os }}</li>
              <li class="screenshots-title"><strong>Processor:</strong> {{ game.minimumSystemRequirements.processor }}</li>
              <li class="screenshots-title"><strong>Memory:</strong> {{ game.minimumSystemRequirements.memory }}</li>
              <li class="screenshots-title"><strong>Graphics:</strong> {{ game.minimumSystemRequirements.graphics }}</li>
              <li class="screenshots-title"><strong>Storage:</strong> {{ game.minimumSystemRequirements.storage }}</li>
            </ul>
          </div>

          <!-- Add buttons for the different lists -->
          <div class="button-container" style="display: flex; gap: 10px;">
            <button *ngFor="let list of lists" 
                    (click)="toggleList(list)"
                    [disabled]="isGameInAnyList() && !isCurrentList(list)"
                    class="list-button"
                    [ngClass]="{
                      'active-list': isCurrentList(list),
                      'inactive-list': isGameInAnyList() && !isCurrentList(list),
                      'no-list': !isGameInAnyList()
                    }"
                    style="display: flex; align-items: center;">
              <mat-icon [fontIcon]="getIconForList(list.name)" style="margin-right: 8px;"></mat-icon>
              {{ isCurrentList(list) ? 'Remove from ' : 'Add to ' }}{{ list.name }}
            </button>
          </div>
        </div>
      </div>

  `,
  styleUrls: ['./game-details.component.css'],
  standalone: true,
  imports: [CommonModule, NavbarComponent, MatIconModule,] // Import CommonModule to use ngIf
})
export class GameDetailComponent implements OnInit {
  game: Game | null = null;
  lists: any[] = [];
  gameId: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gameService: GameServiceService,
    private userService: UserServiceService,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID to check platform type
  ) {}

  async ngOnInit() {
    // Get the 'id' parameter from the URL
    this.gameId = this.route.snapshot.paramMap.get('id');  // 'id' is the route parameter key

    if (this.gameId) {
      // Fetch game details using the id from the URL
      this.gameService.getGameDetailsById(this.gameId.toString()).subscribe((gameData) => {
        this.game = gameData;
        console.log(this.game?.screenshots[0]);

        // Optionally set a background image based on game data
        if (this.game && isPlatformBrowser(this.platformId)) {
          document.body.style.backgroundImage = `url(${this.game.thumbnail})`;
          document.body.style.backgroundSize = 'cover';
          document.body.style.backgroundPosition = 'center';
        }


      }, (error) => {
        console.error('Error fetching game details:', error);
      });

      const profile = await this.userService.getUserProfile();
      this.lists = profile['lists'];

      console.log(this.lists);

      
    } else {
      console.error('No game ID found in the URL');
    }
  }

  // Check if the game is in any list
  isGameInAnyList(): boolean {
    return this.lists.some(list => list.gamesIds && list.gamesIds.includes(this.gameId));
  }

  // Check if the game is in a specific list
  isCurrentList(list: any): boolean {
    return list.gamesIds && list.gamesIds.includes(this.gameId);
  }

  // Function to handle adding/removing the game from a specific list
  toggleList(list: any): void {
    if (this.gameId) {
      const isInCurrentList = this.isCurrentList(list);
      if (isInCurrentList) {
        this.removeFromList(list.name); // Call remove function if game is in the current list
      } else {
        this.addToList(list.name); // Call add function if game is not in the list
      }
    }
  }

  // Function to handle adding the game to a specific list
  addToList(listName: string): void {
    if (this.gameId) {
      this.gameService.addGameToList(this.gameId, listName);
    }
  }

  // Function to handle adding the game to a specific list
  removeFromList(listName: string): void {
    if (this.gameId) {
      this.gameService.removeGameFromList(this.gameId, listName);
    }
  }

  // Function to check if the game is already in the list
  isGameInList(list: any): boolean {
    console.log(list.gamesIds);
    console.log(this.gameId?.toString());
    console.log(list.gamesIds.includes(this.gameId?.toString()));
    return list.gamesIds && list.gamesIds.includes(this.gameId);
  }

  // Function to get the correct icon based on the list name
  getIconForList(listName: string): string {
    switch (listName) {
      case 'Play Later':
        return 'timer'; // Use a clock icon for "Play Later"
      case 'Currently Playing':
        return 'play_arrow'; // Use a play icon for "Currently Playing"
      case 'Played':
        return 'check_circle'; // Use a check circle for "Played"
      case 'Completed':
        return 'done_all'; // Use a "done all" icon for "Completed"
      default:
        return 'list'; // Default list icon
    }
  }
}
