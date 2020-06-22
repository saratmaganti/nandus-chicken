import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {ProductsComponent} from './products/products.component';
import {SearchProductsComponent} from './search-products/search-products.component';
import { ProfileComponent } from './profile/profile.component';
import { WhyComponent } from './why/why.component';
import { StoresComponent } from './stores/stores.component';
import { PreCheckoutComponent } from './pre-checkout/pre-checkout.component';
import { BillingAddressComponent } from './billing-address/billing-address.component';
import { CertifiedComponent } from './certified/certified.component';
import { CareersComponent } from './careers/careers.component';
import { AuthenticFoodComponent } from './authentic-food/authentic-food.component';
import { PaymentsSelectionComponent } from './payments-selection/payments-selection.component';
import { PaymentStatusComponent } from './payment-status/payment-status.component';

const routes: Routes = [
  {
    path: 'productDetails',
    component: ProductDetailsComponent
  },
  {
    path: 'product',
    component: ProductsComponent
  },
  {
    path: 'search',
    component: SearchProductsComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'why',
    component: WhyComponent
  },
  {
    path: 'stores',
    component: StoresComponent
  },
  {
    path: 'cart',
    component: PreCheckoutComponent
  },
  {
    path: 'address',
    component: BillingAddressComponent
  },
  {
    path: 'certified',
    component: CertifiedComponent
  },
  {
    path: 'careers',
    component: CareersComponent
  },
  {
    path: 'authentic',
    component: AuthenticFoodComponent
  },
  {
    path: 'payment-modes',
    component: PaymentsSelectionComponent
  },
  {
    path: 'payment-status',
    component: PaymentStatusComponent
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
