import { Component, OnInit} from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ViewexamComponent } from './components/viewexam/viewexam.component';
import { filter } from 'rxjs';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  isViewExamActive: any;

  title(title: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isViewExamActive = this.activatedRoute.firstChild?.component === ViewexamComponent;
    });
  }
}
