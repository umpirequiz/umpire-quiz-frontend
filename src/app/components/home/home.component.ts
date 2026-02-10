import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {QuestionService} from "../../services/question.service";
import {QuestionCount} from "../../domain/QuestionCount";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  count: QuestionCount[] = []

  constructor(private service: QuestionService) {
  }

  ngOnInit(): void {
    this.service.count().subscribe(r => {
      this.count = r
    })
  }
}
