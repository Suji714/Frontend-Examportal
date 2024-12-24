import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/Questions.service';
import { CommonModule } from '@angular/common';
import { Questions } from '../../model/questions';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';

import { StudentanswerService } from '../../services/studentanswer.service';
import { studentAnswers } from '../../model/studentanswer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SocremodalComponent } from '../socremodal/socremodal.component';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-viewexam',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './viewexam.component.html',
  styleUrl: './viewexam.component.css'
})
export class ViewexamComponent implements OnInit {

  questions: Questions[] = [];
  userId: number = 0;

  questionTopic: string = ''; // Initialize the question topic

  timeLeft: number;  // 30 minutes in seconds
  minutes: number;
  seconds: number;
  interval: any;


  constructor(private route: ActivatedRoute,
              private questionService:QuestionsService,
              private studentAnswerService: StudentanswerService,
              private router: Router,
              private modalService: NgbModal,
              private authService: AuthenticationService,
             
   ){

    this.timeLeft = 30 * 60; // 30 minutes in seconds
    this.minutes = Math.floor(this.timeLeft / 60);
    this.seconds = this.timeLeft % 60;
   }


  ngOnInit() {

    this.userId =this.authService.id;
    console.log('user id on view exam'+this.userId);

    this.startTimer();

    this.route.paramMap.subscribe(params => {
      const topic = params.get('topic');
      if (topic) {
        this.loadQuestions(topic);
        this.questionTopic = topic; // Set the question topic   
        this.toggleFullScreen();
      }
    });
    
  }

  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(err => {
          console.error(`Error attempting to exit fullscreen mode: ${err.message} (${err.name})`);
        });
      }
    }
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.minutes = Math.floor(this.timeLeft / 60);
      this.seconds = this.timeLeft % 60;
      this.timeLeft--;

      if (this.timeLeft < 0) {
        clearInterval(this.interval);
        this.submitExam();
      }
    }, 1000);
  }



  onTopicChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedTopic = selectElement.value;
    this.loadQuestions(selectedTopic);
    this.questionTopic = selectedTopic; // Update the question topic
  }

  loadQuestions(topic: string) {
    this.questionService.getQuestions(topic).subscribe((res) => {
      this.questions = res;
    }
  );

  }

  openScoreModal(score: number, topic: string) {
    const modalRef = this.modalService.open(SocremodalComponent);
    modalRef.componentInstance.score = score;
    modalRef.componentInstance.topic = topic;
    modalRef.componentInstance.totalQuestions = this.questions.length;
 
    modalRef.result.then((result) => {
      if (result === 'submit') {
        this.submitExamToDatabase();
      }
    }, (reason) => {
      console.log('Modal dismissed');
    });
  }
 
  calculateScore() {
    // Assuming you have a method to calculate the score
    let score = 0;
    this.questions.forEach(q => {
      if (q.selectedOption === q.correctAnswer) {
        score++;
      }
    });
    return score;
  }
 
  submitExam() {
    console.log('Exam submitted');
    const topic = this.route.snapshot.paramMap.get('topic');
    if (!topic) {
      console.error('Topic is null');
      return;
    }
 
    const score = this.calculateScore();
    this.openScoreModal(score, topic);
  }
 
  submitExamToDatabase() {
    const topic = this.route.snapshot.paramMap.get('topic');
    if (!topic) {
      console.error('Topic is null');
      return;
    }
 
    const answers = this.questions.map(q => new studentAnswers(q.questionId, q.selectedOption || ''));
    console.log(answers);
 
    this.studentAnswerService.submitExam(this.userId, topic, answers)
      .subscribe((response: any) => {
        alert("Exam submitted");
        console.log(response);
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 500); // Redirect after 2 seconds
      });
  }

  
}
