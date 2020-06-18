import { Component, OnInit } from '@angular/core';
import { LoginService } from '../core/services/login.service';
import { UserInfo } from '../core/models/userInfo.model';
import { Router } from '@angular/router';
import { AddressService } from '../core/services/address.service';
import { WishListResponse } from '../core/models/wishList.model';
import { CartDataService } from '../core/services/cartdata.service';
import { Cart } from '../core/models/shopping-cart.model';
import { ShoppingCartService } from '../core/services/shopping-cart.service';
import { OrdersList, OrdersInfo } from '../core/models/orderInfo.model';
import { Country } from '../core/models/country.model';
import { State } from '../core/models/state.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo: UserInfo;
  oldPassword: string = '';
  newPassword: string = '';
  UpdateResponse: WishListResponse;
  totalCart$: Cart[];
  ItemsCount: number = 0;
  customerOrders: OrdersList;
  activeTab: string = "Orders";
  countries: Country[];
  states: State[];
  userFirstName: string = '';
  userLastName: string = '';
  userEmail: string = '';
  userMobile: string = '';
  userAddress1: string = '';
  userAddress2: string = '';
  userCompany: string = '';
  userCity: string = '';
  userZip: string = '';
  userCountry: string = '';
  userState: string = '';
  userDetails: UserInfo;
  constructor(private loginService: LoginService, private router: Router, private cartService: ShoppingCartService, private addressService: AddressService, private cartDataService: CartDataService) {
    if (sessionStorage.userKey != "undefined" && sessionStorage.userKey != null)
      this.GetProfileDetails(sessionStorage.userKey);
    else
      this.router.navigate(['/']);
    if (sessionStorage.getItem('userKey')) {
      this.GetUserDetails(sessionStorage.getItem('userKey'));

      this.GetCartDetails();
      this.GetOrderDetails();
    }
  }

  ngOnInit() {
    this.BindCountries();
  }

  GetOrderDetails() {
    this.loginService.GetCustomerOrders(sessionStorage.getItem('userKey'))
      .subscribe(
        customerOrders => {
          // this.customerOrders = customerOrders;
          console.log("customerOrders:" + customerOrders[0]["orders_list"]);
          if (customerOrders[0]["status"]) {
            this.customerOrders = customerOrders[0]["orders_list"];
          }
          else {
          }
        },
        errors => {
          console.log(errors);
          //  this.router.navigate(['/']);
        }
      );
  }
  GetCartDetails() {
    this.cartService.GetCartDetails(sessionStorage.getItem('userKey')).subscribe(
      cart => {
        this.totalCart$ = cart;
        console.log(cart);
        if (this.totalCart$[0]["status"] == "true") {
          // this.cartInformation = this.totalCart$[0]["result"];
          this.ItemsCount = this.totalCart$[0]["result"].length;
          this.cartDataService.updateCart(this.totalCart$);
        }
        else {
          this.router.navigate(['/']);
        }
      },
      errors => {
        console.log(errors);
      }
    );
  }

   GetProfileDetails(userKey) {
    this.loginService.GetCustomerDetails(userKey).subscribe(
      userInfo => {
        this.userInfo = userInfo[0][0];
        console.log(this.userInfo);
      },
      errors => {
        console.log(errors);
        alert(errors.error);
        this.router.navigate(['/']);
      }
    );
  }

  Logout() {
    alert("Logout Successfully");
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  ChangePassword() {
    if (!this.newPassword)
      alert("Please enter new password");
    else if (!this.oldPassword)
      alert("Please enter old password");
    else {
      //call method to save
      this.addressService.ChangePassword(this.oldPassword, this.newPassword, sessionStorage.userKey)
        .subscribe(
          UpdateResponse => {
            this.UpdateResponse = UpdateResponse;
            console.log("UpdateResponse:" + UpdateResponse[0]);
            if (this.UpdateResponse[0]["status"] == "true") {
              alert(this.UpdateResponse[0]["success"])
            }
            else {
              alert(this.UpdateResponse[0]["error"])
            }
          },
          errors => {
            console.log(errors);
            alert("Update Failed");
            //  this.router.navigate(['/']);
          }
        );
    }
  }
  ActivateTab(tabName) {
    this.activeTab = tabName;
  }

  isActive(item) {
    return this.activeTab === item;
  };

  GetUserDetails(customerId) {
    this.loginService.GetCustomerDetails(customerId)
      .subscribe(
        loginResponse => {
          this.userDetails = loginResponse;
          if (this.userDetails[0]) {
            this.userFirstName = this.userDetails[0][0].first_name;
            this.userLastName = this.userDetails[0][0].last_name;
            this.userEmail = this.userDetails[0][0].customer_email;
            this.userMobile = this.userDetails[0][0].customer_mobile;
            this.userAddress1 = this.userDetails[0][0].customer_address_1;
            this.userAddress2 = this.userDetails[0][0].customer_address_2;
            this.userCompany = this.userDetails[0][0].company;
            this.userCity = this.userDetails[0][0].city;
            this.userZip = this.userDetails[0][0].zip;
            this.userCountry = this.userDetails[0][0].country;
            this.userState = this.userDetails[0][0].state;
          }
          else {
            alert("Invalid Login");
          }
        },
        errors => {
          console.log(errors);
          this.router.navigate(['/']);
        }
      );

  }
  BindCountries() {
    this.addressService.GetCountries().subscribe(
      coutries => {
        this.countries = coutries;
        console.log("Countries:" + coutries);
      },
      errors => {
        console.log(errors);
      }
    );
  }
  getCountryDetails(countryId) {
    console.log(countryId);
    if (countryId != "") {
      this.addressService.GetStates(countryId).subscribe(
        states => {
          this.states = states;
          console.log("States:" + this.states);
        },
        errors => {
          console.log(errors);
        }
      );
    }
    else {
      alert("Please select country");
    }
  }

  SaveAddress() {
    if (!this.userFirstName)
      alert("Please enter first name");
    else if (!this.userLastName)
      alert("Please enter last name");
    else if (!this.userEmail)
      alert("Please enter email");
    else if (!this.userMobile)
      alert("Please enter mobile");
    else if (!this.userAddress1)
      alert("Please enter address1");
    else if (!this.userCity)
      alert("Please enter city");
    else if (!this.userZip)
      alert("Please enter zip");
    else if (!this.userCountry)
      alert("Please select country");
    else if (!this.userState)
      alert("Please select state");
    else {
      let UserAddressInfo = {
        customer_id: sessionStorage.getItem('userKey'),
        first_name: this.userFirstName,
        last_name: this.userLastName,
        customer_email: this.userEmail,
        customer_mobile: this.userMobile,
        customer_address_1: this.userAddress1,
        customer_address_2: this.userAddress2,
        company: this.userCompany,
        city: this.userCity,
        zip: this.userZip,
        country: this.userCountry,
        state: this.userState,
      };
      //call method to save
      this.addressService.UpdateAddress(UserAddressInfo)
        .subscribe(
          UpdateResponse => {
            this.UpdateResponse = UpdateResponse;
            console.log("UpdateResponse:" + UpdateResponse[0]);
            if (this.UpdateResponse[0]["status"]) {
              alert(this.UpdateResponse[0]["success"])
            }
            else {
              alert("Update Failed");
            }
          },
          errors => {
            console.log(errors);
            //  this.router.navigate(['/']);
          }
        );
    }
  }
}
