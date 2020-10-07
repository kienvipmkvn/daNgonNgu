import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';

import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }
  
  login(email: string, password: string) {
    return this.http
      .post<User>(environment.api.loginRoute,
        {
          userName: email,
          password: password,
          appType: 0,
          clientType: 1
        },
      ).pipe(
        tap((resData:any) => {
          console.log(resData);
          const user = new User(resData.data);
          if (user.status === 1 && user.companyType === 1) {
            this.handleAuthentication(user, 3600);
          } else {
            if(user.status !==1 )
              throw new Error(user.status + '');
            else throw new Error('10');
          }
        }),
        catchError(this.handleError)
      );
  }

  autoLogin() {
    const ctxUser= localStorage.getItem('userData');
    if(!ctxUser){
      return;
    }
    const ctxUserData: User = JSON.parse(ctxUser);
    if (!ctxUserData) {
      return;
    }
    const actUser = localStorage.getItem('currentUserData');
    if(!actUser){
      return;
    }
    const actUserData: User = JSON.parse(actUser);
    if (actUserData === null || actUserData === undefined) {
      localStorage.setItem('currentUserData', JSON.stringify({ userId: ctxUserData.userId, companyId: ctxUserData.companyId }));
    }
    if (ctxUserData.accessToken) {
      this.user.next(ctxUserData);
      const expirationDuration = new Date(ctxUserData.tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('currentUserData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.router.navigate(['/dang-nhap']);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    user: User,
    expiresIn: number
  ) {
    const currentTime = new Date().getTime();
    user.tokenExpirationDate = new Date(currentTime + expiresIn * 1000 * 24);
    localStorage.setItem('userData', JSON.stringify(user));
    localStorage.setItem('currentUserData', JSON.stringify({ userId: user.userId, companyId: user.companyId }));
    this.user.next(user);
    this.autoLogout(expiresIn * 1000 * 24);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'Có lỗi gì đó đã sảy ra, vui lòng không hoang mang!';
    console.log(errorResponse);
    if (!errorResponse.message) {
      return throwError(errorMessage);
    }
    switch (errorResponse.message) {
      case '2':
        errorMessage = 'Thông tin đăng nhập không đúng';
        break;
      case '3':
        errorMessage = 'Update Required: Chưa biết cái này là cái gì. A hi hi!';
        break;
      case '4':
        errorMessage = 'Tài khoản của bạn đang bị khóa.';
        break;
      case '5':
        errorMessage = 'Bạn đăng nhập trên thiết bị không phù hợp';
        break;
      case '10':
        errorMessage = 'Không có quyền truy cập!';
        break;
    }
    return throwError(errorMessage);
  }
}
