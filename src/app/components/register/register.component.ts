import { Component } from '@angular/core';
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
export class RegisterComponent {

  
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
        fname: ['', Validators.required],
        lname: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        dob: ['', Validators.required],
        phoneNo: ['', [Validators.required, Validators.minLength(10)]],

        city: ['', Validators.required],
        qname: ['', Validators.required],
        yoc: ['', Validators.required],
        
      });
    }
  
    // Getter for easy access to form fields
get f() {
  return this.userForm.controls;
}

// Getter for nested address form group
get addressControls() {
  return (this.userForm.get('address') as FormGroup).controls;
}
  
onSubmit() {
  this.submitted = true;

  if (this.userForm.invalid) {
    return;
  }

  this.authenticationService.registerDealer(this.userForm.value).subscribe({
    next: (response: string) => {
      // Success case - display success message
      this.successMessage = response || 'User Registered Successfully';
      console.log('User registered successfully', response);

      // Navigate to login page after 3 seconds
      setTimeout(() => {
        this.router.navigate(['/login']); // Navigate to login component
      }, 3000); // 3 seconds delay
    },
    error: (error) => {
      console.error('Error registering dealer', error);
    }
  });
}

}
