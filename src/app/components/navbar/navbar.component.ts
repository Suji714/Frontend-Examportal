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
 
  title = 'exam-portal';
  username :string='';
  isUserLoggedIn:boolean=false; 

  constructor(public authService: AuthenticationService) {}

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
