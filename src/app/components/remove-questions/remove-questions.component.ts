import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-remove-questions',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  templateUrl: './remove-questions.component.html',
  styleUrl: './remove-questions.component.css'
})
export class RemoveQuestionsComponent {

  removeQuestionTopic: string = '';
 
  constructor(private http: HttpClient) {}
 
  onRemoveQuestions(): void {
    if (this.removeQuestionTopic) {
      this.http.delete(`http://localhost:7777/api/admin/remove-questions/${this.removeQuestionTopic}` ,{ responseType: 'text' }).subscribe(
        response => {
          console.log('Questions removed successfully', response);
          alert('Questions removed successfully');
          this.removeQuestionTopic = '';
        },
        error => {
          console.error('Error removing questions', error);
          alert('Error removing questions');
        }
      );
    }
  }

}
