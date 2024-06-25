import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {QuizComponent} from "./components/quiz/quiz.component";
import {QuizHomeComponent} from "./components/quiz/home/quiz-home.component";
import {PlayQuizComponent} from "./components/quiz/play/play-quiz.component";
import {ResultsComponent} from "./components/quiz/results/results.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'quiz', component: QuizComponent,
    children: [
      {path: '', component: QuizHomeComponent},
      {path: 'play', component: PlayQuizComponent},
      {path: 'results', component: ResultsComponent}
    ]
  }
];
