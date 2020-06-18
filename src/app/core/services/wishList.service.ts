import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { ApiService } from './api.service';
import { WishListResponse } from '../models/wishList.model';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpParams } from '@angular/common/http';
import { Cart } from '../models/shopping-cart.model';

@Injectable()
export class WishListService {

  constructor(
    private apiService: ApiService
  ) { }

  AddtoWishListService(userId,productId): Observable<WishListResponse> {
    let body = new HttpParams().set(`user_id`, userId).set(`product_id`, productId);
    return this.apiService.post(`${environment.wishList_url}`, body)
      .pipe(map(data => data.wishlist_info));
  }

 
}
