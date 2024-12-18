import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  title = 'exam-portal';
  username :string='';
  isUserLoggedIn:boolean=false; 

  constructor(public authService: AuthenticationService, private router:Router) {}

  registration(){
    this.router.navigate(['/register']);
  }

  ngOnInit() {
    this.authService.userName$.subscribe((email: string) => {
      this.username = email;
      this.isUserLoggedIn=this.authService.isLoggedIn();
    });

  }

    
  handleLogout(){
    this.authService.logout();
  }

}
