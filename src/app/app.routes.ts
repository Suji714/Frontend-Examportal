import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ExamComponent } from './components/exam/exam.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},   
    {path: 'aboutus', component: AboutusComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'exam', component: ExamComponent}

];