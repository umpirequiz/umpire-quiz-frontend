import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router, RouterLink} from "@angular/router";
import {emptyQuestion} from "../../../domain/Question";
import {FormsModule, NgForm, NgModel} from "@angular/forms";
import {QuestionService} from "../../../services/question.service";
import {AnswersComponent} from "../../quiz/answers/answers.component";
import {GameStateComponent} from "../../quiz/game-state/game-state.component";
import {QuestionComponent as QuizQuestionComponent}  from "../../quiz/question/question.component";
import {QuestionErrorsComponent} from "../question-errors/question-errors.component";
import {SelectDifficultiesComponent} from "../../quiz/select-difficulties/select-difficulties.component";
import {Levels} from "../../quiz/home/quiz-home.component";

@Component({
  selector: 'app-admin-question',
  standalone: true,
  imports: [FormsModule, AnswersComponent, GameStateComponent, QuizQuestionComponent, RouterLink, QuestionErrorsComponent, SelectDifficultiesComponent],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent implements OnInit {

  editMode = true;
  question = emptyQuestion();
  modeLabel = "Edit";
  levels: Levels;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: QuestionService) {
    this.levels =  {u1: false, u2: false, u3: false, u4: false}
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params: ParamMap) => this.processUrlParams(params.get('subPath') ?? "")
    )
  }

  private processUrlParams(subPath: string) {
    if (subPath === 'add') {
      this.editMode = false;
      this.modeLabel = "Add"
    } else {
      this.loadQuestion(subPath);
    }
  }

  private loadQuestion(idParam: string | null) {
    let id = (idParam !== null) ? +idParam : -1;
    this.service.find(id).subscribe(result => this.question = result);
  }

  save(questionForm: NgForm) {
    if (!questionForm.valid) return;

    console.log(this.question)
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

  asterisk(model: NgModel) {
    return model.errors?.['required'] ? "*" : "";
  }
}
