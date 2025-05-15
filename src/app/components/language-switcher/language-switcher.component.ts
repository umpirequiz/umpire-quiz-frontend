import {Component} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";

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

  constructor(private cookieService: CookieService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    let selectedLang = this.cookieService.get("selectedLang");
    if (selectedLang) this.selectedLang = selectedLang;
  }

  select(lang: string) {
    this.selectedLang = lang;
    this.cookieService.set("selectedLang", this.selectedLang, { expires: 36500, path: '/' });

    // Construct the new URL with selected language and redirect
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);

    // Replace the first path segment with the selected language
    const pathSegments = url.pathname.split('/').filter(seg => !!seg);
    pathSegments[0] = lang;

    url.pathname = '/' + pathSegments.join('/');
    window.location.href = url.toString();
  }

}
