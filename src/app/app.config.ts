import {ApplicationConfig, DEFAULT_CURRENCY_CODE, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';
import {jwtInterceptor} from './guards/jwt.interceptor';
import {cacheInterceptor} from "./guards/cache.interceptor";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(
      withInterceptors([jwtInterceptor, cacheInterceptor]),
    ),
    provideAnimationsAsync(),
    {provide: LOCALE_ID, useValue: 'nl-NL'},
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'}, provideAnimationsAsync(),
  ]
};
