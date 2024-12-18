import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ViewexamComponent } from '../viewexam/viewexam.component';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [RouterLink, CommonModule, Router, ViewexamComponent],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css'
})
export class ExamComponent {

   selectedTopic: string = '';
  
    constructor(private router: Router){}
  
    navigateToTopic() {
      if (this.selectedTopic) {
        this.router.navigate(['/viewexam', this.selectedTopic]);
      }
    }

}
