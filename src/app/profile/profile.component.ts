import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserServiceService } from '../../app/services/user_services/user-service.service'

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';  // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf and other common directives

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  lists: UserList[];
}

export interface UserList {
  id: string;
  name: string;
  gamesIds: string[];
}

@Component({
  selector: 'app-profile',
  standalone: true,
  template: `
    <app-navbar></app-navbar>
    <div class="stars"></div>
    <div class="profile-container" *ngIf="userProfile">
      <div class="form-container">
        <h1 class="title">Update Profile</h1>
        <form [formGroup]="myForm" (ngSubmit)="onSubmit()">

          <div class="form-group">
            <label for="id">ID:</label>
            <input type="text" formControlName="id" class="input-field">
          </div>

          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" formControlName="name" class="input-field">
          </div>

          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" formControlName="email" class="input-field">
          </div>

          <div class="form-group">
            <label for="avatar">Avatar URL:</label>
            <input type="text" formControlName="avatar" class="input-field" placeholder="Enter image URL">
          </div>

          <!-- Image Upload Section -->
          <!--<div class="form-group">
            <label for="avatarFile">Upload Avatar:</label>
            <input type="file" (change)="onFileSelected($event)" id="avatarFile" class="input-field">
          </div> -->

          <div class="form-group">
            <button type="submit" class="submit-btn">Update</button>
          </div>
        </form>
      </div>
    </div>

  `,
  styleUrls: ['./profile.component.css'],
  imports: [NavbarComponent, FormsModule, CommonModule, ReactiveFormsModule]  // Import CommonModule for ngIf
})
export class ProfileComponent implements OnInit {

  userProfile: UserProfile = {
    id: '',
    name: '',
    email: '',
    password: '',
    avatar: '',
    lists: []
  };

  myForm: FormGroup = new FormGroup(
    {
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      avatar: new FormControl('', [Validators.required]),
      lists: new FormControl([], [Validators.required])
    });

  // Spectrum of greens and black shades
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

  constructor(private router: Router, private user_service: UserServiceService, @Inject(PLATFORM_ID) private platformId: Object) {}

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.createStars(5); // Create stars
      this.startBackgroundAnimation(); // Start the background color change
    }

    try {
      this.userProfile = await this.user_service.getUserProfile();  // Await the Promise to get the games
    } catch (error) {
      console.error('Error fetching games:', error);  // Handle any errors
    }

    this.myForm.controls['id'].setValue(this.userProfile.id);
    this.myForm.controls['name'].setValue(this.userProfile.name);
    this.myForm.controls['email'].setValue(this.userProfile.email);
    this.myForm.controls['password'].setValue(this.userProfile.password);
    this.myForm.controls['avatar'].setValue(this.userProfile.avatar);
    this.myForm.controls['lists'].setValue(this.userProfile.lists);
  }

  // Handle file input change to display the preview
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      
      // // Create a file preview
      // reader.onload = () => {
      //   this.avatarPreview = reader.result as string; // Set the avatar preview (base64 image)
      // };

      // Read the file as data URL (base64 string)
      reader.readAsDataURL(file);
      
      // Optionally, you can send this file to the backend here as well
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
    }, 10000); // Change color every 2 seconds
  }

  // Method to handle form submission
  onSubmit() {
    if (!this.myForm.invalid) {

        this.user_service.updateProfile(this.myForm.getRawValue()).subscribe({
            next: (data) => {
                this.router.navigate(['/home']);
            },
            error: (error) => {
                console.log('Algo deu errado:', error);
            }
        });
    }
}
}
