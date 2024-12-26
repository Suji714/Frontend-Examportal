import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-reports.component.html',
  styleUrl: './view-reports.component.css'
})
export class ViewReportsComponent {

   
  reports: { firstname: string, topic: string, score: number }[] = [];
 
  constructor(private http: HttpClient) {}
 
  onViewReports(): void {
    this.http.get<any[]>('http://localhost:7777/api/admin/view-reports').subscribe(
      response => {
        console.log('Reports fetched successfully', response);
        this.reports = response.map(item => ({
          firstname: item[0],
          topic: item[1],
          score: item[2]
        }));
      },
      error => {
        console.error('Error fetching reports', error);
        alert('Error fetching reports');
      }
    );
  }

}
