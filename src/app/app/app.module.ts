import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import { ExamComponent } from '../components/exam/exam.component';
import { ViewexamComponent } from '../components/viewexam/viewexam.component';
import { QuestionsService } from '../services/Questions.service';

const routes: Routes = [
  {path: 'viewexam/:topic', component: ViewexamComponent}
]

@NgModule({
  declarations: [ ExamComponent, ViewexamComponent],
  imports: [ CommonModule, BrowserModule, HttpClientModule, FormsModule, RouterModule.forRoot (routes) ],
  providers: [ QuestionsService ],
  bootstrap: [ ExamComponent]
})
export class AppModule { }
