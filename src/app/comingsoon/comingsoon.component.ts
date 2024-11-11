import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component'; // Assuming Navbar component is used

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  template: `
    <app-navbar></app-navbar>
    <div class="stars"></div> <!-- Stars background -->
    <div class="content">
      <h1 class="title">Coming Soon!</h1>
      <p class="message">We're working hard on something amazing. Stay tuned!</p>
    </div>
  `,
  styleUrls: ['./comingsoon.component.css'],
  imports: [NavbarComponent] // Declare Navbar as a dependency
})
export class ComingSoonComponent implements OnInit {
  private colors = [
    '#0a0f0a', // Dark green-black
    '#1d2b1d', // Dark forest green
    '#2e4532', // Medium green
    '#415b41', // Slightly lighter green
    '#537d4e', // Lush green
    '#6c9a60', // Light green
    '#87b374', // Greenish tint
    '#a3c08e', // Pale green
    '#4b4d45'  // Charcoal green-black
  ];
  private currentIndex = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.createStars(100); // Create stars background
      this.startBackgroundAnimation(); // Start the background color change
    }
  }

  createStars(count: number) {
    const starsContainer = document.querySelector('.stars') as HTMLElement;
    
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.width = `${Math.random() * 3 + 1}px`;
      star.style.height = star.style.width;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.left = `${Math.random() * 100}vw`;
      star.style.opacity = Math.random().toString();
      
      starsContainer.appendChild(star);
    }
  }

  startBackgroundAnimation() {
    // Set the body background color and manage transitions
    const body = document.body;

    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.colors.length;
      body.style.transition = 'background-color 1s ease-in-out';
      body.style.backgroundColor = this.colors[this.currentIndex];
    }, 10000); // Change color every 2 seconds
  }
}
