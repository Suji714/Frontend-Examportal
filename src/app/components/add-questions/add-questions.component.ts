import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-questions',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  templateUrl: './add-questions.component.html',
  styleUrl: './add-questions.component.css'
})
export class AddQuestionsComponent {

  newQuestionTopic: string = '';
  selectedFile: File | null = null;
 
  constructor(private http: HttpClient) {}
 
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
 
  onAddQuestions(): void {
    if (this.selectedFile && this.newQuestionTopic) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('topic', this.newQuestionTopic);
 
      console.log('Form Data:', formData);
      console.log('Selected File:', this.selectedFile);
      console.log('New Question Topic:', this.newQuestionTopic);
 
      this.http.post('http://localhost:8086/api/admin/add-questions', formData, { responseType: 'text' }).subscribe(
        response => {
          console.log('Questions added successfully', response);
          alert('Questions added successfully');
          this.newQuestionTopic = '';
          this.selectedFile = null;
        },
        error => {
          console.error('Error adding questions', error);
          alert(`Error adding questions: ${error.message}`);
        }
      );
    }
  }
 
}


