import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-user-score',
  templateUrl: './user-score.component.html',
  styleUrls: ['./user-score.component.css']
})
export class UserScoreComponent {
  userId: number = 4; // Static user ID for testing, replace with dynamic value as needed

  constructor(private http: HttpClient) {}

  downloadPdf(): void {
    const url = `http://localhost:7777/api/user/score/${this.userId}/download`;
    this.http.get(url, { responseType: 'blob' }).subscribe((response: Blob) => {
      const fileName = 'UserScore.pdf';
      saveAs(response, fileName);
    }, error => {
      console.error('Error downloading the file', error);
    });
  }
}
