import {ApplicationConfig, DEFAULT_CURRENCY_CODE, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {jwtInterceptorFn} from './guards/jwt.interceptor';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';


import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([jwtInterceptorFn])
    ),
    provideAnimationsAsync(),
    {provide: LOCALE_ID, useValue: 'nl-NL'},
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'}, provideAnimationsAsync(),
  ]
};
