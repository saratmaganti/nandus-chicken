import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { SliderInfo } from '../models/sliderinfo.model';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class SliderService {
  constructor (
    private apiService: ApiService
  ) {}

  getAll(): Observable<SliderInfo[]> {
    return this.apiService.get(`${environment.slider_url}`)
      .pipe(map(data => data.slider_info));
  }

  getLogoImage(): Observable<any> {
    return this.apiService.get(`${environment.logo_url}`)
      .pipe(map(data => data.setting_info));
  }
}
