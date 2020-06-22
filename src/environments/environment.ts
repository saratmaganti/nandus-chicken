// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url: 'https://syndemos.com/nandu_v1/api/',
  api_url_two: 'https://syndemos.com/nandu_v1/',
  // api_url: 'https://localhost/nandu_v1/api/',
  // api_url_two: 'https://localhost/nandu_v1/',
  api_key:'nandu@123',
  slider_url:'slider_list/format/json',
  category_url:'categorylist/format/json',
  bestseller_url:'best_sale/format/json',
  best_sale_by_category_url:'best_sale_by_category/format/json',
  search_url:'search/format/json',
  productList_url:'productlist/format/json',
  login_url:'login',
  logo_url:'web_setting/format/json',
  customerInfo_Url:'Customer_info/format/json',
  reg_url:'Registration/format/json',
  stores_url:'find_stores/format/json',
  wishList_url:'wishlist/format/json',
  addtoCart:'Addtocart/format/json',
  removeCart:'Removecart/format/json',
  preCheckout:'Precheckout/format/json',
  stockAvailability:'variant/format/json',
  stockCount:'stock/format/json',
  applyCoupon:'Apply_coupon/format/json',
  countriesList:'country_list/format/json',
  countryDetails:'country_info/format/json',
  stateDetails:'state_list/format/json',
  customerUpdate:'user_update/format/json',
  changePassword:'user_change_password/format/json',
  customerOrders:'manage_orders/format/json'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
