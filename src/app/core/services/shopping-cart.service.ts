import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { ApiService } from './api.service';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Cart } from '../models/shopping-cart.model';

@Injectable()
export class ShoppingCartService {

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
  ) { }

  private formatErrors(error: any) {
    return  throwError(error.error);
  }

  AddtoCartService(userId,productId,quantity): Observable<Cart[]> {
    let body = new HttpParams().set(`user_id`, userId).set(`product_id`, productId).set(`product_qty`, quantity);
    return this.apiService.post(`${environment.addtoCart}`, body)
      .pipe(map(data => data.addtocart_info));
  }
  RemoveCartService(userId,productId): Observable<Cart[]> {
    let body = new HttpParams().set(`user_id`, userId).set(`product_id`, productId);
    return this.apiService.post(`${environment.removeCart}`, body)
      .pipe(map(data => data.addtocart_info));
  }
  GetCartDetails(userId): Observable<Cart[]> {
    let body = new HttpParams().set(`user_id`, userId);
    return this.apiService.post(`${environment.preCheckout}`, body)
      .pipe(map(data => data.addtocart_info));
  }
  ApplyCoupon(userId,couponCode): Observable<Cart[]> {
    let body = new HttpParams().set(`user_id`, userId).set(`coupon_code`, couponCode);
    return this.apiService.post(`${environment.applyCoupon}`, body)
      .pipe(map(data => data.addtocart_info));
  }
  proceedToCompleteOrder(payload) {
    return this.http.post(
      `${environment.api_url}${'placeorder'}`,payload, { headers: 
        {'Content-Type':'application/x-www-form-urlencoded'} }
    ).pipe(catchError(this.formatErrors));
  }
  }