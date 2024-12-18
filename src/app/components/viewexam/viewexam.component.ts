import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/Questions.service';
import { CommonModule } from '@angular/common';
import { Questions } from '../../model/questions';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-viewexam',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewexam.component.html',
  styleUrl: './viewexam.component.css'
})
export class ViewexamComponent implements OnInit {

 
  questions: Questions[] = [];

  constructor(private route: ActivatedRoute, private questionService:QuestionsService){}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const topic = params.get('topic');
      if (topic) {
        this.loadQuestions(topic);
      }
    });
  }

  onTopicChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedTopic = selectElement.value;
    this.loadQuestions(selectedTopic);
  }

  loadQuestions(topic: string) {
    this.questionService.getQuestions(topic).subscribe((res) => {
      this.questions = res;
    }
  );

  }

}