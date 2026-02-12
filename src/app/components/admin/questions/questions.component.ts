import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Question} from "../../../domain/Question";
import {Observable} from "rxjs";
import {MatPaginator, MatPaginatorIntl, PageEvent} from "@angular/material/paginator";
import {MyPaginatorConfig} from "../../../my.paginator.config";
import {SearchComponent} from "../../search/search.component";
import {QuestionService} from "../../../services/question.service";
import {FormsModule} from "@angular/forms";
import {MatTooltip} from "@angular/material/tooltip";
import {SelectDifficultiesComponent} from "../../quiz/select-difficulties/select-difficulties.component";
import {Levels} from "../../../domain/Levels";
import {none} from "../../../domain/Difficulty";

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [
    RouterLink,
    MatPaginator,
    SearchComponent,
    FormsModule,
    MatTooltip,
    SelectDifficultiesComponent,
  ],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
  providers: [{provide: MatPaginatorIntl, useClass: MyPaginatorConfig}],
})
export class QuestionsComponent implements OnInit {
  questions: Question[] = [];
  questions$!: Observable<Question[]>;
  levels: Levels;

  // for paging:
  totalItems = 100;
  pageSize = 25;
  currentPage = 0;
  pageSizeOptions = [10, 25, 50, 100]
  private includeAll = false;
  private includeBugs = false;
  private searchTerm: string = '';

  constructor(private questionService: QuestionService) {
    this.levels = {u1: true, u2: true, u3: true, u4: true}
  }

  ngOnInit(): void {
    this.questions$ = this.questionService.questionsUpdated$;
    this.getQuestions()
  }

  getQuestions() {
    this.questionService.search(this.searchTerm, this.includeAll, this.includeBugs);
    this.questions$?.subscribe(r => {
        r = r.filter(q => {
          switch (q.difficulty) {
            case "U1":
              return this.levels.u1
            case "U2":
              return this.levels.u2
            case "U3":
              return this.levels.u3
            case "U4":
              return this.levels.u4
            default:
              return none
          }
        })

        this.totalItems = r.length
        let start = this.currentPage * this.pageSize;
        let end = start + this.pageSize;
        this.questions = r.slice(start, end);
      }
    )
  }

  remove(id: number) {
    this.questionService.remove(id);
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getQuestions()
  }

  handleSearch(input: string) {
    this.searchTerm = input;
    this.getQuestions()
  }

  toggleAll() {
    this.includeAll = !this.includeAll;
    this.getQuestions()
  }

  toggleBug() {
    this.includeBugs = !this.includeBugs;
    this.getQuestions()
  }

  handleSearchInputChanged(input: string) {
    this.searchTerm = input;
  }

  filterByLevel() {
    this.getQuestions();
  }
}

