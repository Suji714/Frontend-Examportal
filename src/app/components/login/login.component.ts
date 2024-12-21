import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData = { email: '', password: '' };
  errorMessage: string = '';
  successMessage: string = '';
  userId: number | number = 0; // Property to store user ID
 
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }
 
  onSubmit() {

    if (this.loginData.email && this.loginData.password) {
      this.authService.login(this.loginData).subscribe({
        next: (response: any) => {
          if (response.message === 'Login successful!') {
            this.userId = response.userId; // Store user ID
            this.authService.setSession('some-auth-token', this.loginData.email, this.userId);
            this.successMessage = 'Login Success. Redirecting...';
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 500);
 
            const ab: number = this.authService.getId(this.userId);
            console.log('in slogin:' + ab);
          } else {
            this.errorMessage = 'Invalid login credentials.';
          }
        },
        error: (error) => {
          console.error('Login error', error);
          this.errorMessage = 'An error occurred during login.';
        }
      });
    }
  }

}
