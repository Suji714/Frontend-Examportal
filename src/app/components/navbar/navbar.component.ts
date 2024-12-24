import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  username: string = '';
  isUserLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;
 
  constructor(private authService: AuthenticationService,
              
  ) {}
 
  ngOnInit() {
    this.authService.userName$.subscribe((email: string) => {
      // this.username = email;
      this.isUserLoggedIn = this.authService.isUserLoggedIn();
      this.isAdminLoggedIn = this.authService.isAdminLoggedIn();
     
      console.log('Admin: token: '+ this.isAdminLoggedIn);
      console.log('User :Token:  '+ this.isUserLoggedIn);
    });
  }
 
  handleLogout() {
    this.authService.logout();
  }
 
}
