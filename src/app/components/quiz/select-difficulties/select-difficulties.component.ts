import {Component, Input} from '@angular/core';
import {Levels} from "../../../domain/Levels";

@Component({
  selector: 'app-select-difficulties',
  standalone: true,
  imports: [],
  templateUrl: './select-difficulties.component.html',
  styleUrl: './select-difficulties.component.scss'
})
export class SelectDifficultiesComponent {

  @Input() levels: Levels = {u1: false, u2: false, u3: false, u4: false}
}
