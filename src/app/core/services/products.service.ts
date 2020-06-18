import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { ApiService } from './api.service';
import { Product } from '../models/productInfo.model';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Variant } from '../models/variant.model';
import { Stock } from '../models/stock.model';

@Injectable()
export class ProductService {
  constructor(
    private apiService: ApiService, private http: HttpClient
  ) { }

  private formatErrors(error: any) {
    return  throwError(error.error);
  }
  getProducts(categoryId): Observable<Product[]> {
    let body = new HttpParams().set(`category_id`, categoryId);
    return this.apiService.post(`${environment.best_sale_by_category_url}`, body)
      .pipe(map(data => data.product_info));
  }

  getSearchProducts(searchKey): Observable<Product[]> {
    let body = new HttpParams().set(`keyword`, searchKey);
    return this.apiService.post(`${environment.search_url}`, body)
      .pipe(map(data => data.product_info));
  }

    getAllProducts(lat,lng): Observable<Product[]> {
      let body = new HttpParams().set(`lat`, lat).set(`lng`, lng);
    return this.apiService.post(`${environment.productList_url}`,body)
      .pipe(map(data => data.product_info));
  }
  getProductsByCategory(categoryId,lat,lng): Observable<Product[]> {
    let body = new HttpParams().set(`categoryId`, categoryId).set(`lat`, lat).set(`lng`, lng);
  return this.apiService.post(`${environment.productList_url}`,body)
    .pipe(map(data => data.product_info));
}

// getStockAvailability(variant_id): Observable<Variant> {
//   let body = new HttpParams().set(`variant_id`, variant_id);
// return this.apiService.post(`${environment.stockAvailability}`,body)
//   .pipe(map(data => data.variant_info));
// }
getStockCount(product_id,store_id): Observable<Stock> {
  let body = new HttpParams().set(`product_id`, product_id).set(`store_id`, store_id);
return this.apiService.post(`${environment.stockCount}`,body)
  .pipe(map(data => data.stock_info));
}
}
