import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { NavbarComponent } from './components/navbar/navbar.component';

import { provideClientHydration } from '@angular/platform-browser';

import { HomeComponent } from './components/home/home.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ExamComponent } from './components/exam/exam.component';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { ViewexamComponent } from './components/viewexam/viewexam.component';
import { ContactpageComponent } from './components/contactpage/contactpage.component';
import { AddQuestionsComponent } from './components/add-questions/add-questions.component';
import { RemoveQuestionsComponent } from './components/remove-questions/remove-questions.component';
import { ViewReportsComponent } from './components/view-reports/view-reports.component';
import { UserScoreComponent } from './components/user-score/user-score.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path: 'home', component: HomeComponent},
    {path: 'navbar', component: NavbarComponent},
    {path: 'aboutus', component: AboutusComponent},
    {path: 'login', component: LoginComponent},
    {path: 'adminlogin', component: AdminloginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'exam', component: ExamComponent},
    {path: 'admindashboard', component: AdmindashboardComponent},
    {path: 'viewexam/:topic', component: ViewexamComponent},
    {path: 'contactpage', component: ContactpageComponent},
    {path: 'admin/add-questions', component: AddQuestionsComponent},
    {path: 'admin/remove-questions', component: RemoveQuestionsComponent},
    {path: 'admin/view-reports', component: ViewReportsComponent},
    {path: 'score', component: UserScoreComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [provideClientHydration()],
  })

export class AppRoutingModule { }