import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SliderComponent } from './slider/slider.component';
import { CoreModule } from './core/core.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CategoriesComponent } from './categories/categories.component';
import { BestsaleproductsComponent } from './bestsaleproducts/bestsaleproducts.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { SearchProductsComponent } from './search-products/search-products.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ModalComponent } from './modal/modal.component';
import { LocationComponent } from './location/location.component';
import { AutocompleteComponent } from './google-places/google-places.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SocialLoginModule, AuthServiceConfig, AuthService } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { WhyComponent } from './why/why.component';
import { StoresComponent } from './stores/stores.component';
import { AgmCoreModule } from '@agm/core';
import { PreCheckoutComponent } from './pre-checkout/pre-checkout.component';
import { BillingAddressComponent } from './billing-address/billing-address.component';
import { CertifiedComponent } from './certified/certified.component';
import { CareersComponent } from './careers/careers.component';
import { AuthenticFoodComponent } from './authentic-food/authentic-food.component';

export function socialConfigs() {    
  const config = new AuthServiceConfig(    
    [    
      {    
        id: FacebookLoginProvider.PROVIDER_ID,    
        provider: new FacebookLoginProvider('177141010308199')    
      },    
      {    
        id: GoogleLoginProvider.PROVIDER_ID,    
        provider: new GoogleLoginProvider('561200483555-qpal3oll3o4qm1ku0eeeinde3njnp2bp.apps.googleusercontent.com')    
      }    
    ]    
  );    
  return config;    
} 

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    HeaderComponent,
    HomeComponent,
    SliderComponent,
    CategoriesComponent,
    BestsaleproductsComponent,
    ProductDetailsComponent,
    ProductsComponent,
    SearchProductsComponent,
    ProductCardComponent,
    ModalComponent,
    LocationComponent,
    AutocompleteComponent,
    LoginComponent,
    ProfileComponent,
    WhyComponent,
    StoresComponent,
    PreCheckoutComponent,
    BillingAddressComponent,
    CertifiedComponent,
    CareersComponent,
    AuthenticFoodComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDxpHMdwr2fP_gqjUCD4uneU8ngjKLmw84'
      // libraries: ['places']
    }),
    CarouselModule,
    AppRoutingModule,
    FormsModule,
    CoreModule,
    SocialLoginModule,
   
  ],
  providers: [
    AuthService,    
    {    
      provide: AuthServiceConfig,    
      useFactory: socialConfigs    
    } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
