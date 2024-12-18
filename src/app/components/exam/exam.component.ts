import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [ CommonModule, FormsModule],
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
