import {Component, Input} from '@angular/core';
import {InternationalizedString} from "../../../domain/Question";

@Component({
  selector: 'app-ruling',
  standalone: true,
  imports: [],
  templateUrl: './ruling.component.html',
  styleUrl: './ruling.component.scss'
})
export class RulingComponent {
  @Input() ruling?: InternationalizedString
}
