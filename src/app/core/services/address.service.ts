import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpParams } from '@angular/common/http';
import { Country } from '../models/country.model';
import { State } from '../models/state.model';
import { WishListResponse } from '../models/wishList.model';

@Injectable()
export class AddressService {
  constructor(
    private apiService: ApiService
  ) { }


  GetCountries(): Observable<Country[]> {
    return this.apiService.get(`${environment.countriesList}`)
      .pipe(map(data => data.country_info));
  }
  GetCountryDetails(countryID): Observable<Country> {
    let body = new HttpParams().set(`country_id`, countryID);
    return this.apiService.post(`${environment.countryDetails}`, body)
      .pipe(map(data => data.country_info));
  }
  GetStates(countryID): Observable<State[]> {
    let body = new HttpParams().set(`country_id`, countryID);
    return this.apiService.post(`${environment.stateDetails}`, body)
      .pipe(map(data => data.state_info));
  }

  UpdateAddress(UserAddressInfo): Observable<WishListResponse> {
    let body = new HttpParams()
      .set(`customer_id`, UserAddressInfo.customer_id)
      .set(`first_name`, UserAddressInfo.first_name)
      .set(`last_name`, UserAddressInfo.last_name)
      .set(`email`, UserAddressInfo.customer_email)
      .set(`mobile`, UserAddressInfo.customer_mobile)
      .set(`address_1`, UserAddressInfo.customer_address_1)
      .set(`address_2`, UserAddressInfo.customer_address_2)
      .set(`company`, UserAddressInfo.company)
      .set(`city`, UserAddressInfo.city)
      .set(`zip`, UserAddressInfo.zip)
      .set(`country_id`, UserAddressInfo.country)
      .set(`state`, UserAddressInfo.state);
    return this.apiService.post(`${environment.customerUpdate}`, body)
      .pipe(map(data => data.user_info));
  }

  ChangePassword(oldPassword,newPassword,customer_id): Observable<WishListResponse> {
    let body = new HttpParams()
    .set(`customer_id`, customer_id)
    .set(`new_password`, newPassword)
    .set(`old_password`, oldPassword);
    return this.apiService.post(`${environment.changePassword}`, body)
      .pipe(map(data => data.user_info));
  }

}

