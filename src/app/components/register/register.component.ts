import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  
  userForm!: FormGroup;
  submitted = false;
  successMessage: string = ''; // Property to store success message
  
  
  // a form builder is a service that helps in building Reactive forms dynamically
  constructor(private formBuilder: FormBuilder,
    private router:Router,
    private authenticationService: AuthenticationService) {}

    //build reactive form dynamically

    ngOnInit() {
      this.userForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dob: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', Validators.required],
      qualification: ['', Validators.required],
      yoc: ['', Validators.required],
    });
  }
 
  get f() {
    return this.userForm.controls;
  }
 
  onSubmit() {
    this.submitted = true;
 
    if (this.userForm.invalid) {
      return;
    }
 
    this.authenticationService.registerUser(this.userForm.value).subscribe({
      next: (response: string) => {
        // Success case - display success message
        this.successMessage = 'User Registered Successfully';
        console.log('User registered successfully', response);
 
        // Clear the form
        this.userForm.reset();
        this.submitted = false;
 
        // Navigate to login page after 3 seconds
        setTimeout(() => {
          this.router.navigate(['/login']); // Navigate to login component
        }, 3000); // 3 seconds delay
      },
      error: (error) => {
        console.error('Error registering user', error);
      }
    });
  }
}


