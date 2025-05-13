import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {emptyQuestion} from "../../../domain/Question";
import {FormsModule, NgForm} from "@angular/forms";
import {QuestionService} from "../../../services/question.service";
import {AnswersComponent} from "../../quiz/answers/answers.component";
import {GameStateComponent} from "../../quiz/game-state/game-state.component";
import {QuestionComponent as QuizQuestionComponent} from "../../quiz/question/question.component";
import {QuestionErrorsComponent} from "../question-errors/question-errors.component";
import {SelectDifficultiesComponent} from "../../quiz/select-difficulties/select-difficulties.component";
import {fromDiff, Levels} from "../../../domain/Levels";
import {Difficulty} from "../../../domain/Difficulty";


@Component({
  selector: 'app-admin-question',
  standalone: true,
  imports: [FormsModule, AnswersComponent, GameStateComponent, QuizQuestionComponent, QuestionErrorsComponent, SelectDifficultiesComponent],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent implements OnInit {

  editMode = true;
  question = emptyQuestion();
  modeLabel = $localize `:QuestionComponent Edit Label:Edit`;
  levels: Levels;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: QuestionService) {
    this.levels = {u1: false, u2: false, u3: false, u4: false}
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params: ParamMap) => this.processUrlParams(params.get('subPath') ?? "")
    )
  }

  private processUrlParams(subPath: string) {
    if (subPath === 'add') {
      this.editMode = false;
      this.modeLabel = $localize `:QuestionComponent Add Label:Add`;
    } else {
      this.loadQuestion(subPath);
    }
  }

  private loadQuestion(idParam: string | null) {
    let id = (idParam !== null) ? +idParam : -1;
    this.service.find(id).subscribe(result => {
      this.question = result
      this.levels = fromDiff(this.question.difficulty);
    });
  }

  save(questionForm: NgForm) {
    if (!questionForm.valid) return;

    if (this.editMode) {
      this.service.update(this.question)
    } else {
      this.service.add(this.question)
    }
    this.back();
  }

  cancel() {
    this.back();
  }

  private back() {
    this.router.navigate(['admin'])
  }

  select(diff: Difficulty) {
    this.question.difficulty = diff
    console.log(this.question);
  }
}
