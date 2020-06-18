import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Store } from '../models/Store.model';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class StoresService {
  constructor (
    private apiService: ApiService
  ) {}

  getAllstores(): Observable<Store[]> {
    return this.apiService.get(`${environment.stores_url}`)
      .pipe(map(data => data.store_info));
  }
}
