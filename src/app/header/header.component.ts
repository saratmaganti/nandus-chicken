import { Component, OnInit, NgZone, Input,Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { CategoryService } from '../core/services/category.service';
import { Categories } from '../core/models/categories.model';
import { Router } from '@angular/router';
import { CategoryDataService } from '../core/services/categorydata.service';
import { SearchDataService } from '../core/services/searchdata.service';
import { ModalService } from '../core/services/modal.service';
import { SliderService } from '../core/services/slider.service';
import { LoginService } from '../core/services/login.service';
import { UserInfo } from '../core/models/userInfo.model';
import { LocationDataService } from '../core/services/locationdata.service';
import { CartDataService } from '../core/services/cartdata.service';
import { Cart } from '../core/models/shopping-cart.model';
import { ShoppingCartService } from '../core/services/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  formattedAddress: string;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  @Input() locationdisplay:string;
  categories: Categories[];
  categoryId: string;
  searchKey: string = '';
  location: string = "Select Store ";
  LoginStatus: string = "SIGN IN / SIGN UP";
  WebsiteLogo: string = "assets/images/logo/logo.png"; //../assets/images/logo/logo.png
  userInfo:UserInfo;
  totalCart$:Cart[];
  
  @Output()
  selectedAddress: EventEmitter<string> = new EventEmitter<string>();
  ItemsCount:number=0;
  constructor(public zone: NgZone,private categoryService: CategoryService,private cartService: ShoppingCartService,private cartDataService:CartDataService, private router: Router,private locationDataService:LocationDataService, private categoryDataService: CategoryDataService, private searchDataService: SearchDataService, private modalService: ModalService, private sliderService: SliderService,private loginService:LoginService) {
    this.GetLogo();
    this.setCurrentLocation();
    this.cartDataService.getCartDetails().subscribe(
      cartDetails=>{
        this.totalCart$=cartDetails;
      if (this.totalCart$ [0]["status"]=="true") {
        console.log("count"+this.totalCart$ [0]["result"].length);
      this.ItemsCount=this.totalCart$ [0]["result"].length;
}
else{
  this.GetCartDetails();
}
});
    if (sessionStorage.Location != "undefined" && sessionStorage.Location != null) {
      this.location = sessionStorage.Location;
    }
  }

  GetCartDetails() {
    this.cartService.GetCartDetails(sessionStorage.getItem('userKey')).subscribe(
      cart => {
        this.totalCart$ = cart;
        console.log(cart);
        if (this.totalCart$[0]["status"] == "true") {
          // this.cartInformation = this.totalCart$[0]["result"];
          this.ItemsCount=this.totalCart$ [0]["result"].length;
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

  ngAfterViewInit() {
    // this.setCurrentLocation();
    if (sessionStorage.userID != "undefined" && sessionStorage.userID != null) {
      this.LoginStatus = sessionStorage.userName;
    }
    if (sessionStorage.Location != "undefined" && sessionStorage.Location != null) {
      this.location = sessionStorage.Location;
    }
    // else {
    //   this.openModal('LocationModal');
    // }

  }
  ngOnInit() {
    this.categoryService.getAll()
      .subscribe(
        categories => {
          this.categories = categories;
          this.categoryService.changeCategories(this.categories);
          console.log("cat" + categories);
        },
        errors => {
          console.log(errors);
        }
      );
      
      // this.GetItems();
  }

  GetLogo() {
    this.sliderService.getLogoImage().subscribe(
      logoImage => {
        this.WebsiteLogo = logoImage[0].logo;
        console.log(this.WebsiteLogo);
      },
      errors => {
        console.log(errors);
        alert(errors.error);
        this.router.navigate(['/']);
      }
    );
  }
  Precheckout()
  {
    if (sessionStorage.userID != "undefined" && sessionStorage.userID != null) 
    this.router.navigate(['/cart']);
    else
    {
      this.openModal("SignInModal");
    }
    // this.router.navigate(['/']);
  }
  GetProductsByCategoryId(category: Categories) {
    this.categoryId = category.id;
    this.categoryDataService.changeCategory(this.categoryId);
    this.router.navigate(['/product']);
  }

  onEnter(searchKey: string) {
    this.searchDataService.changeSearch(searchKey);
    if (searchKey)
      this.router.navigate(['/search']);
    else
      return false;
  }

  openModal(id: string) {
    if (id == "SignInModal") {
      if (sessionStorage.userKey != "undefined" && sessionStorage.userKey != null) {
        this.router.navigate(['/profile']);
        this.modalService.close(id);
      }
      else
        this.modalService.open(id);
    }
    else
    {
      if (sessionStorage.Location != "undefined" && sessionStorage.Location != null) {
        this.location = sessionStorage.Location;
      }
      this.modalService.open(id);
    }
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }

 

  SetLocation(e) {
    this.location = e;
    sessionStorage.setItem('Location', e);
    this.locationDataService.changeLocation(e)
    this.closeModal('LocationModal')
  }
  changeLoginStatus(userId) {
    this.LoginStatus =userId;
    //  sessionStorage.setItem('userID', userId);
  }
  NavigatetoStores()
  {
    this.router.navigate(['/stores']);
  }
  // GetItems()
  // {
  //     this.cartDataService.currentUpdatedCart.subscribe(cart => {
  //       this.totalCart$ = cart;
  //       if (this.totalCart$[0]["status"]=="true") {
  //         console.log("count"+this.totalCart$[0]["result"].length);
  //       this.ItemsCount=this.totalCart$[0]["result"].length;
  //       }
  //     });
  // }


  // Get Current Location Coordinates
  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        // this.zoom = 8;
        sessionStorage.setItem("LatLng",JSON.stringify({"lat":this.latitude,"lng":this.longitude}))
        this.getCurrentAddress(this.latitude, this.longitude);
      });
    }
  }
  getCurrentAddress(latitude, longitude) {
    this.geoCoder = new google.maps.Geocoder;
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          // this.zoom = 12;
          this.address = results[0].formatted_address;
          this.selectedAddress.emit(this.address);
          this.location=this.address;
          // this.locationdisplay=this.address;
          console.log("FormattedAddress:" + this.address);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Google API key Expired');
        // window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
}
