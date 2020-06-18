import { Component, OnInit } from '@angular/core';
import { AddressService } from '../core/services/address.service';
import { Country } from '../core/models/country.model';
import { State } from '../core/models/state.model';
import { UserInfo } from '../core/models/userInfo.model';
import { WishListResponse } from '../core/models/wishList.model';
import { Router } from '@angular/router';
import { LoginResponse } from '../core/models/login.model';
import { LoginService } from '../core/services/login.service';
import { ShoppingCartService } from '../core/services/shopping-cart.service';
import { CartDataService } from '../core/services/cartdata.service';

@Component({
  selector: 'app-billing-address',
  templateUrl: './billing-address.component.html',
  styleUrls: ['./billing-address.component.css']
})
export class BillingAddressComponent implements OnInit {

  countries: Country[];
  states:State[];
  userFirstName:string='';
  userLastName:string='';
  userEmail:string='';
  userMobile:string='';
  userAddress1:string='';
  userAddress2:string='';
  userCompany:string='';
  userCity:string='';
  userZip:string='';
  userCountry:string='';
  userState:string='';
  userDetails: UserInfo;
  UpdateResponse:WishListResponse;
  constructor(
    private addressService: AddressService,
    private router:Router,
    private loginService:LoginService,
    private shoppingCartService: ShoppingCartService,
    private cartDataService: CartDataService) {
   if(sessionStorage.getItem('userKey'))
    this.GetUserDetails(sessionStorage.getItem('userKey'));
  }

  ngOnInit() {
    this.BindCountries();
  }

  GetUserDetails(customerId)
  {
    this.loginService.GetCustomerDetails(customerId)
    .subscribe(
      loginResponse => {
        this.userDetails = loginResponse;
        if (this.userDetails[0]) {
          this.userFirstName=this.userDetails[0][0].first_name;
          this.userLastName=this.userDetails[0][0].last_name;
          this.userEmail=this.userDetails[0][0].customer_email;
          this.userMobile=this.userDetails[0][0].customer_mobile;
          this.userAddress1=this.userDetails[0][0].customer_address_1;
          this.userAddress2=this.userDetails[0][0].customer_address_2;
          this.userCompany=this.userDetails[0][0].company;
          this.userCity=this.userDetails[0][0].city;
          this.userZip=this.userDetails[0][0].zip;
          this.userCountry=this.userDetails[0][0].country;
          this.userState=this.userDetails[0][0].state;
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
        console.log("Countries:"+ coutries);
      },
      errors => {
        console.log(errors);
      }
    );
  }
  getCountryDetails(countryId) {
    console.log(countryId);
    if(countryId!="")
    {
      this.addressService.GetStates(countryId).subscribe(
        states => {
          this.states = states;
          console.log("States:"+ this.states);
        },
        errors => {
          console.log(errors);
        }
      );
    }
    else
    {
      alert("Please select country");
    }
  }

  SaveAddress()
  {
    if(!this.userFirstName)
     alert("Please enter first name");
     else if(!this.userLastName)
     alert("Please enter last name");
     else if(!this.userEmail)
     alert("Please enter email");
     else if(!this.userMobile)
     alert("Please enter mobile");
     else if(!this.userAddress1)
     alert("Please enter address1");
     else if(!this.userCity)
     alert("Please enter city");
     else if(!this.userZip)
     alert("Please enter zip");
     else if(!this.userCountry)
     alert("Please select country");
     else if(!this.userState)
     alert("Please select state");
     else
     {
     let UserAddressInfo={
      customer_id:sessionStorage.getItem('userKey'),
      first_name:this.userFirstName,
      last_name:this.userLastName,
      customer_email:this.userEmail,
      customer_mobile:this.userMobile,
      customer_address_1:this.userAddress1,
      customer_address_2:this.userAddress2,
      company:this.userCompany,
      city:this.userCity,
      zip:this.userZip,
      country:this.userCountry,
      state:this.userState,
     };
       //call method to save
       this.addressService.UpdateAddress(UserAddressInfo)
       .subscribe(
         UpdateResponse => {
           this.UpdateResponse = UpdateResponse;
           console.log("UpdateResponse:" + UpdateResponse[0]);
           if (this.UpdateResponse[0]["status"]) {
             alert(this.UpdateResponse[0]["success"] );
             // checkout methods 
             const payload = this.preparePayload(UserAddressInfo);
            //  this.shoppingCartService.proceedToCompleteOrder(payload).subscribe((resp: any) => {

            //  });
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
  preparePayload(UserAddressInfo) {
    this.cartDataService.getCartDetails().subscribe((data: any) => {
      
      console.log(data);
    })
  }
}
