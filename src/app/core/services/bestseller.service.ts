import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Product } from '../models/productInfo.model';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class BestSeller {
  constructor (
    private apiService: ApiService
  ) {}

  getAll(): Observable<Product[]> {
    return this.apiService.get(`${environment.bestseller_url}`)
      .pipe(map(data => data.product_info));
  }

}
