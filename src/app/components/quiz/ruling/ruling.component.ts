import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {emptyI18dString, InternationalizedString} from "../../../domain/Question";
import {I18nService} from "../../../services/i18n.service";

@Component({
  selector: 'app-ruling',
  standalone: true,
  imports: [],
  templateUrl: './ruling.component.html',
  styleUrl: './ruling.component.scss'
})
export class RulingComponent implements OnInit, OnChanges {
  @Input() ruling?: InternationalizedString
  @Input() link?: string
  rulingTranslatedValue = "";

  constructor(private i18nService: I18nService) {
  }

  ngOnInit(): void {
    this.updateI18nValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ruling'] && !changes['ruling'].isFirstChange()) {
      this.updateI18nValue();
    }
  }

  private updateI18nValue(): void {
    this.rulingTranslatedValue = this.i18nService.translate({i18nValue: this.ruling ?? emptyI18dString()});
  }
}
