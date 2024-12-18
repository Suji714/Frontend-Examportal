import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Questions } from '../model/questions';

export interface Question {
  topic: string;
  questionId: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private baseUrl = 'http://localhost:8084/api/exam/questions/';

  constructor(private http: HttpClient) { }
  
  getQuestions(topic: string): Observable<Questions[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
    });

    const url = `${this.baseUrl}${topic}`;
    return this.http.get<Questions[]>(url, { headers });
  }
}
