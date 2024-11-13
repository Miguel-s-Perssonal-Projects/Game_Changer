import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError, timeout } from 'rxjs';
import { UserProfile } from '../../profile/profile.component';  // Import the UserProfile model

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private apiUrl = '/profile';  // The endpoint to get the profile data (adjust if needed)

  constructor(private http: HttpClient) { }

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

  // Method to update user profile (if needed, e.g., for updating name or email)
  updateProfile(updateProfile: UserProfile) {
    return this.http.put('http://localhost:3000/profile', updateProfile)
  }
}
