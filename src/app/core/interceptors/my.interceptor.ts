// Interceptor = перехватчик. Позволяет видоизменить запрос или ответ
// Используется когда хотим применить некую бизнес-логику к нескольким запросам
// Например, авторизация - будет перехватывать запросы и добавлять токен авторизации

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpParams
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  // Принимает запрос и handler, возвращает Onservable http Event-а
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // request interceptor
    // Реквест нельзя мутировать, поэтому клонируем и передаем в next.handle
    let clonedRequest;

    // Работает только для запросов, касающихся пользователей, поэтому проверяем url
    if (req.url.includes('users')) {
      clonedRequest = req.clone({
        params: new HttpParams()
          .set('ts_interceptor', Date.now().toString()) // можно добавить токен авторизации
      });
      console.log(clonedRequest);
    } else {
      clonedRequest = req;
    }

    // return next.handle(clonedRequest);
    return next.handle(clonedRequest)
      .pipe(
        // response interceptor
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // do stuff with response
            if (event.url.includes('users')) {
              console.log('Response Interceptor:');
              console.log(event);
              console.log(event.body);
            }
            return event;
          }
        })
      );
  }
}
