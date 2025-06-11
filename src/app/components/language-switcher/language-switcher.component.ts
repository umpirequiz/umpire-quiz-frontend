import {Component} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss'
})
export class LanguageSwitcherComponent {
  selectedLang = 'en';

  constructor(private cookieService: CookieService) {
    // Initially, switch to previously selected language:
    let cookieLang = this.cookieService.get("selectedLang");
    if (cookieLang && this.selectedLang !== cookieLang) {
      this.selectedLang = cookieLang;
      this.switchLang(cookieLang);
    }
  }

  switchLang(lang: string) {
    this.selectedLang = lang;
    this.cookieService.set("selectedLang", this.selectedLang, {expires: 36500, path: '/'});

    const url = new URL(window.location.href);

    // Replace the first path segment with the selected language
    const pathSegments = url.pathname.split('/').filter(seg => !!seg);
    pathSegments[0] = lang;

    url.pathname = '/' + pathSegments.join('/');
    window.location.href = url.toString();
  }

}
