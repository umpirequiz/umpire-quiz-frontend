import {Component, EventEmitter, Input, Output} from '@angular/core';
import {fromDiff, Levels} from "../../../domain/Levels";
import {FormsModule} from "@angular/forms";
import {Difficulty, u1, u2, u3, u4} from "../../../domain/Difficulty";
import {MatTooltip} from "@angular/material/tooltip";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-select-difficulties',
  standalone: true,
  imports: [
    FormsModule,
    MatTooltip,
    MatIcon
  ],
  templateUrl: './select-difficulties.component.html',
  styleUrl: './select-difficulties.component.scss'
})
export class SelectDifficultiesComponent {

  @Input() levels: Levels = {u1: false, u2: false, u3: false, u4: false}
  @Input() admin = false;
  @Output() choose = new EventEmitter<Difficulty>();

  tooltipText = "Corresponds to U1-U4 levels (1=beginner, 4=veteran)";
  tooltipVisible = false;

  select(selectedLevel: Difficulty) {
    if (this.admin) {
      this.choose.emit(selectedLevel)
      this.levels = fromDiff(selectedLevel)
    }
  }

  protected readonly u1 = u1;
  protected readonly u2 = u2;
  protected readonly u3 = u3;
  protected readonly u4 = u4;


  toggle() {
    this.tooltipVisible = !this.tooltipVisible
  }
}
