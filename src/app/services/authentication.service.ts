import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  id:number = 0;

  getId(userId:number) {
    this.id = userId;
    console.log('in service:'+ userId);
    return this.id;
  }

   //Spring Boot REST-API end points
    private apiUrl='http://localhost:8083/api/user/register';
    private apiUrl1='http://localhost:8083/api/user/login';
    

    registerUser(userData: any): Observable<string> {
      return this.http.post(this.apiUrl, userData, { responseType: 'text' }).pipe(
        catchError(this.handleError)
      );
    }
   
   
    private handleError(error: any) {
      let errorMessage = 'An unknown error occurred';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        errorMessage = `Server Error: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(() => new Error(errorMessage));
    }
   
   
    login(loginData: any): Observable<any> {
      return this.http.post<any>(this.apiUrl1, loginData)
        .pipe(
          map(response => response),
          catchError(error => {
            console.error('Login error', error);
            return throwError(() => new Error('Login failed. Please try again later.'));
          })
        );
    }
   
   
    logout(): void {
   
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('authToken');  // Clear token from localStorage
        sessionStorage.removeItem('userEmail');  // Clear email from sessionStorage
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('authToken1');  // Clear token from localStorage
        sessionStorage.removeItem('userEmail1');  // Clear email from sessionStorage
        sessionStorage.removeItem('userId1');
        // Reset BehaviorSubject after logout
        this.userNameSubject.next('');
      }
   
    }
   
   
    // BehaviorSubject to track user email
    private userNameSubject = new BehaviorSubject<string>('');
    userName$ = this.userNameSubject.asObservable();  // Observable to subscribe to email
   
    constructor(private http: HttpClient, private router: Router) {
   
      if (typeof window !== 'undefined') { // Check if window is available
        // Initialize username on service creation
        const email = sessionStorage.getItem('userEmail');
        if (email) {
          this.userNameSubject.next(email);
        }
      }
    }
   
    // Session management: Save session data (token, etc.)
    setSession(token: string, email: string, userId: number): void {
      sessionStorage.setItem('authToken', token);
      sessionStorage.setItem('userEmail', email);
      sessionStorage.setItem('userId', userId.toString()); // Store user ID as string
      console.log('Token stored:', sessionStorage.getItem('authToken'));
      console.log('Email stored:', sessionStorage.getItem('userEmail'));
      console.log('User ID stored:', sessionStorage.getItem('userId'));
   
      // Update BehaviorSubject so subscribers get the latest email
      this.userNameSubject.next(email);
    }
   
    setSession1(token: string, email: string,userId: number): void {
      sessionStorage.setItem('authToken1', token);
      sessionStorage.setItem('userEmail1', email);
      sessionStorage.setItem('userId1', userId.toString());
      console.log('Token stored:', sessionStorage.getItem('authToken1'));
      console.log('Email stored:', sessionStorage.getItem('userEmail1'));
      console.log('User ID stored:', sessionStorage.getItem('userId1'));
   
      // Update BehaviorSubject so subscribers get the latest email
      this.userNameSubject.next(email);
    }
   
    // Check if a session exists for user
    isUserLoggedIn(): boolean {
      if (typeof window !== 'undefined') {
        let token = sessionStorage.getItem('authToken');
        console.log('Token :' + token);
        return token !== null;
      }
      return false;  // Return false if window is not available
    }
   
    isAdminLoggedIn(): boolean {
      if (typeof window !== 'undefined') {
        let token = sessionStorage.getItem('authToken1');
        console.log('Token :' + token);
        return token !== null;
      }
      console.log('authToken1');
      return false;  // Return false if window is not available
    }
   
  }
   