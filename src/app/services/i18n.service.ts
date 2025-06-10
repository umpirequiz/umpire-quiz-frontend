import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {InternationalizedValued} from "../domain/Question";

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private selectedLang = 'en';

  constructor(private cookieService: CookieService) {
    let selectedLang = this.cookieService.get("selectedLang");
    if (selectedLang) this.selectedLang = selectedLang;
  }

  translate(i18nValued: InternationalizedValued): string {
    if (this.selectedLang === 'nl') return i18nValued.i18nValue.NL_NL
    return i18nValued.i18nValue.EN_US
  }

}
