import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { ApiService } from './api.service';
import { LoginResponse } from '../models/login.model';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpParams, HttpClient } from '@angular/common/http';
import { UserInfo } from '../models/userInfo.model';
import { OrdersInfo } from '../models/orderInfo.model';
const headersConfig = {
  'Content-Type':'application/x-www-form-urlencoded', // 'application/json',
  'Accept': 'application/json',
  'x-api-key': `${environment.api_key}`,
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin,X-Requested-With,Content-Type,Accept,Access-Control-Request-Method',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS,PUT, PATCH,DELETE',
  'Access-Control-Allow-Credentials': 'true',
}

@Injectable()
export class LoginService {

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
  ) { }
 
  convertToQueryString(obj) {
    let str = [];
    for (let prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        str.push(encodeURIComponent(prop)  + '=' + encodeURIComponent(obj[prop]));
      }
    }
    return str.join('&');
  }

  CheckLogin(userId,pwd) {
    let body = new HttpParams().set(`email`, userId).set(`password`, pwd);
    // const body = this.convertToQueryString({
    //   email: userId, password: pwd
    // });
   // const body = `email=test4@gmail.com&password=123456`;
    // return this.apiService.post(`${environment.login_url}`, body)
    //   .pipe(map(data => data.user_info[0]));

      return this.http.post(
        `${environment.api_url}${environment.login_url}`, body, { headers: 
          {'Content-Type':'application/x-www-form-urlencoded'} }
      ).pipe(map((data: any) => data.user_info));
  }

  Register(userName,userId,pwd): Observable<LoginResponse> {
    let body = new HttpParams().set(`full_name`, userName).set(`email`, userId).set(`password`, pwd);
    return this.apiService.post(`${environment.reg_url}`, body)
      .pipe(map(data => data.registration_info));
  }

  GetCustomerDetails(customer_id):Observable<UserInfo> {
    let body = new HttpParams().set(`customer_id`, customer_id);
    return this.apiService.post(`${environment.customerInfo_Url}`, body)
      .pipe(map(data => data.user_info));
  }
  
  GetCustomerOrders(customer_id):Observable<OrdersInfo> {
    let body = new HttpParams().set(`customer_id`, customer_id);
    return this.apiService.post(`${environment.customerOrders}`, body)
      .pipe(map(data => data.orders_info));
  }
}
