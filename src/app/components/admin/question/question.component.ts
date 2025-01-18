import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {emptyQuestion} from "../../../domain/Question";
import {FormsModule, NgForm, NgModel} from "@angular/forms";
import {QuestionService} from "../../../services/question.service";
import {AnswersComponent} from "../../quiz/answers/answers.component";
import {GameStateComponent} from "../../quiz/game-state/game-state.component";
import {QuestionComponent as QuizQuestionComponent}  from "../../quiz/question/question.component";
import {Quiz} from "../../../domain/Quiz";

@Component({
  selector: 'app-admin-question',
  standalone: true,
  imports: [FormsModule, AnswersComponent, GameStateComponent, QuizQuestionComponent],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent implements OnInit {

  editMode = true;
  question = emptyQuestion();
  modeLabel = "Edit";
  quiz!: Quiz;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: QuestionService) {
  }

  ngOnInit(): void {
    this.quiz = JSON.parse(sessionStorage.getItem('activeQuiz') ?? "").quiz;
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
