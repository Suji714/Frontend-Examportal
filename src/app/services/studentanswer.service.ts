import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { studentAnswers } from '../model/studentanswer';



@Injectable({
  providedIn: 'root'
})
export class StudentanswerService {

  private baseUrl = 'http://localhost:8083/api/user';
 
  constructor(private http: HttpClient) { }
 
  submitExam(userId: number, topic: string, answers: studentAnswers[]): Observable<any> {
    const url = `${this.baseUrl}/submit-exam/${topic}?userId=${userId}`;
    return this.http.post(url, answers, {responseType:'text'});
  }

}
