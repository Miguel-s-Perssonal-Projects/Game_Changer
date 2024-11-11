import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-card',
  standalone: true, // Make it standalone
  template: `
    <div class="card hover:scale-105 transition-transform">
      <img class="card-image" [src]="thumbnail" alt="{{ title }}" />
      <div class="card-content">
        <h3 class="card-title">{{ title }}</h3>
        <p class="card-description">{{ shortDescription }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent {
  @Input() title!: string;
  @Input() thumbnail!: string;
  @Input() shortDescription!: string;
}
