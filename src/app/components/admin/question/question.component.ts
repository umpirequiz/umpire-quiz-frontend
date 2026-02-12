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
import {anySelected, fromDiff, Levels, toFirstDiff} from "../../../domain/Levels";


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
  modeLabel = $localize`:@@QuestionComponent.modeLabel.edit:Edit`;
  levels: Levels;
  message = "";

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: QuestionService) {
    this.levels = {u1: true, u2: false, u3: false, u4: false}
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params: ParamMap) => this.processUrlParams(params.get('subPath') ?? "")
    )
  }

  private processUrlParams(subPath: string) {
    if (subPath === 'add') {
      this.editMode = false;
      this.modeLabel = $localize`:@@QuestionComponent.modeLabel.add:Add`;
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
    if (!anySelected(this.levels)) {
      this.message = $localize`:@@quiz.home.select.difficulty:Select at least one difficulty.`;
      return
    }

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

  select(levels: Levels) {
    console.log(levels);
    this.levels = levels;
    this.question.difficulty = toFirstDiff(levels)
  }
}
