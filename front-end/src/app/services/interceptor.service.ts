import { Injectable } from '@angular/core';

import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { UiService } from './ui.service';
import { userService } from '../allServices/user.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  token: string = '';
  constructor(private userService : userService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.userService.getUser()
    const token = user ? user.token : ''
   

    if(token) {

      // headers = headers.append('auth', `Bearer ${token}`)
      req.headers.set('Authorization', 'Bearer ' + token)
      const tokenizedReq = req.clone({ headers: req.headers.set('authorization', 'Bearer ' + token) });
    console.log('interceptorsbbbbbb',tokenizedReq)

      return next.handle(tokenizedReq);

    }
    
    console.log('interceptors',req.headers)
    // if (this.token) {
    //   const tokenizedReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.token) });
    //   return next.handle(tokenizedReq);
    // }
    return next.handle(req);
  }
}
