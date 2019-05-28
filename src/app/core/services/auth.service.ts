import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    return of(true)
      .pipe( // Преобразовываем поток
        delay(1000), // Задержка 1 сек
        tap(val => this.isLoggedIn = val) // Сайд-эффект, не влияя на поток
      );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
