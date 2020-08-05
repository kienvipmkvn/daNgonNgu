import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'

export class TokenInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const noToken = request.headers.get('NoToken');
    // bỏ qua những truy cập vào thư mục assets
    if (request.url.indexOf("assets/") >= 0 || noToken ==='Y') {
      console.log('khong co token')
      return next.handle(request);
    }

    const userData: User = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      const reqModified = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userData.accessToken}`,
          'Access-Control-Allow-Origin': '*',
          'Content-type': 'application/json'
        }
      });
      return next.handle(reqModified);
    } else {
      const reqModified = request.clone({
        setHeaders: {
          'Content-type': 'application/json'
        }
      });
      return next.handle(reqModified);
    }
  }
}
