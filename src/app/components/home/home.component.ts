import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {QuestionService} from "../../services/question.service";
import {QuestionCount} from "../../domain/QuestionCount";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  protected u1: string = "34";
  questionCount$!: Observable<QuestionCount[]>;

  constructor(private service: QuestionService) {
  }

  ngOnInit(): void {
    this.questionCount$ = this.service.questionCount$
    this.service.count();
  }
}
