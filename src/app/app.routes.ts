import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {QuizComponent} from "./components/quiz/quiz.component";
import {QuizHomeComponent} from "./components/quiz/home/quiz-home.component";
import {PlayQuizComponent} from "./components/quiz/play/play-quiz.component";
import {ResultsComponent} from "./components/quiz/results/results.component";
import {QuestionsComponent} from "./components/admin/questions/questions.component";
import {QuestionComponent} from "./components/admin/question/question.component";
import {authGuard} from "./guards/auth.guard";
import {AdminComponent} from "./components/admin/admin.component";

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
  },
  {
    path: 'admin', component: AdminComponent, canActivate: [authGuard], // now, add router-outlet to AdminComponent's template
    children: [
      {path: ':subPath', component: QuestionComponent}
    ]
  },
  {path: 'questions/:subPath', component: QuestionComponent},
];
