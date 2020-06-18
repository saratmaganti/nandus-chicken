import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8', // 'application/json',
      'Accept': 'application/json',
      'x-api-key': `${environment.api_key}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin,X-Requested-With,Content-Type,Accept,Access-Control-Request-Method',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS,PUT, PATCH,DELETE',
      'Access-Control-Allow-Credentials': 'true',
    };

    // const token = this.jwtService.getToken();

    // if (token) {
    //   headersConfig['Authorization'] = `Token ${token}`;
    // }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
