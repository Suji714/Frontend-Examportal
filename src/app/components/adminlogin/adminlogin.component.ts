import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-adminlogin',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent {

  loginData = { email: '', password: '' };
  errorMessage: string = '';
  successMessage: string = '';
 
  // Static admin credentials
  private adminCredentials = {
    email: 'admin@gmail.com',
    password: 'admin1234'
  };
 
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}
 
  onSubmit() {
    if (this.loginData.email && this.loginData.password) {
      if (this.loginData.email === this.adminCredentials.email && this.loginData.password === this.adminCredentials.password) {
        // Admin login successful
        this.authService.setSession1('admin-auth-token', this.loginData.email,1); // Set admin session
        this.successMessage = 'Admin Login Success. Redirecting...';
        setTimeout(() => {
          this.router.navigate(['/home']); // Navigate to admin dashboard
        }, 500);
      } else {
        this.errorMessage = 'Invalid admin credentials.';
      }
    }
}
}
