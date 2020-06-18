import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';

import { ApiService} from './services/api.service';
import { SliderService } from './services/slider.service';
import { CategoryService } from './services/category.service';
import { CategoryDataService } from './services/categorydata.service';
import { BestSeller } from './services/bestseller.service';
import { ProductService } from './services/products.service';
import { SearchDataService } from './services/searchdata.service';
import { ProductDataService } from './services/productdata.service';
import { ModalService } from './services/modal.service';
import { LoginService } from './services/login.service';
import { LocationDataService } from './services/locationdata.service';
import { StoresService } from './services/stores.service';
import { WishListService } from './services/wishList.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { CartDataService } from './services/cartdata.service';
import { AddressService } from './services/address.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
  // { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    SliderService,
    CategoryService,
    CategoryDataService,
    BestSeller,
    ProductService,
    SearchDataService,
    ProductDataService,
    ModalService,
    LoginService,
    LocationDataService,
    StoresService,
    WishListService,
    ShoppingCartService,CartDataService,AddressService,
   // HttpTokenInterceptor
  ],
  declarations: []
})
export class CoreModule { }
