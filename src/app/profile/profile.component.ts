import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component'; // Import your Navbar component

@Component({
  selector: 'app-profile',
  standalone: true,
  template: `
    <app-navbar></app-navbar>
    <!-- Starry background -->
    <div class="stars">
        <!-- The stars will be dynamically added by JavaScript or CSS for a twinkling effect -->
    </div>

    <!-- Profile form container -->
    <div class="profile-container">
        <div class="form-container">
            <h1 class="title">Update Profile</h1>
            <form class="profile-form">
                <div class="form-group">
                    <label for="id">ID:</label>
                    <input type="text" name="id" id="id" class="input-field">
                </div>

                <div class="form-group">
                    <label for="nome">Name:</label>
                    <input type="text" name="nome" id="nome" class="input-field">
                </div>

                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" name="email" id="email" class="input-field">
                </div>

                <div class="form-group">
                    <label for="pass">Password:</label>
                    <input type="password" name="pass" id="pass" class="input-field">
                </div>

                <div class="form-group">
                    <label for="avatar">Avatar URL:</label>
                    <input type="text" name="avatar" id="avatar" class="input-field">
                </div>

                <div class="form-group">
                    <button type="submit" class="submit-btn">Confirm</button>
                </div>
            </form>
        </div>
    </div>

  `,
  styleUrls: ['./profile.component.css'],
  imports: [NavbarComponent]
})
export class ProfileComponent {}
