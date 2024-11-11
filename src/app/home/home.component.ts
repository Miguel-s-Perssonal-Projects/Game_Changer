import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component'; // Import your Navbar component

@Component({
  selector: 'app-home', // Change the selector to app-home
  standalone: true,
  template: `
    <app-navbar></app-navbar>
    <div class="stars"></div> <!-- Stars background here -->
    <div class="content">
      <h1 class="text-4xl font-bold text-white">Welcome to Game Changer!</h1>
      <p class="mt-4 text-lg text-gray-300">Explore the cosmos!</p>
    </div>
  `,
  styleUrls: ['./home.component.css'], // Ensure you have a separate CSS file if needed
  imports: [NavbarComponent] // Declare the Navbar component as a dependency
})
export class HomeComponent implements OnInit {
  private colors = ['#1a202c', '#2d3748', '#4a5568', '#718096', '#edf2f7'];
  private currentIndex = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.createStars(100); // Create stars
      this.startBackgroundAnimation(); // Start the background color change
    }
  }

  createStars(count: number) {
    const starsContainer = document.querySelector('.stars') as HTMLElement; // Type assertion
    
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.width = `${Math.random() * 3 + 1}px`; // Random size
      star.style.height = star.style.width; // Keep it circular
      star.style.top = `${Math.random() * 100}vh`;
      star.style.left = `${Math.random() * 100}vw`;
      star.style.opacity = Math.random().toString(); // Convert opacity to string
      
      starsContainer.appendChild(star);
    }
  }

  startBackgroundAnimation() {
    // Set the body background color and manage transitions
    const body = document.body;

    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.colors.length;
      body.style.transition = 'background-color 1s ease-in-out'; // Fade effect
      body.style.backgroundColor = this.colors[this.currentIndex];
    }, 2000); // Change color every 2 seconds
  }
}
