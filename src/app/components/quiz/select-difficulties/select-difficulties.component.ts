import {Component, EventEmitter, Input, Output} from '@angular/core';
import {fromDiff, Levels} from "../../../domain/Levels";
import {FormsModule} from "@angular/forms";
import {Difficulty} from "../../../domain/Difficulty";
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
  @Input() label = "Difficulty";
  @Input() singleSelect = false;
  @Input() showIcon = true;
  @Output() choose = new EventEmitter<Levels>();

  select($event: Event) {
    let target = $event.target as HTMLInputElement;
    if (this.singleSelect && target.checked) {
      this.levels = fromDiff(target.id.toUpperCase() as Difficulty)
    }
    this.choose.emit(this.levels)
  }

}
