import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../core/services/login.service';
import { LoginResponse } from '../core/models/login.model';
import { SocialUsers } from '../core/models/socialUsers.model';
import { Router } from '@angular/router';
import { ModalService } from '../core/services/modal.service';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angularx-social-login';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { ShoppingCartService } from '../core/services/shopping-cart.service';
import { Cart } from '../core/models/shopping-cart.model';
import { CartDataService } from '../core/services/cartdata.service';
import { UserInfo } from '../core/models/userInfo.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  response;
  socialusers: SocialUsers;
  tabActive: string = "login";
  userName: string = '';
  userLoginEmail: string = '';
  userLoginPwd: string = '';
  loginResponse: LoginResponse;
  cart:Cart[];
  userInfo: UserInfo;
  @Output()
  LoginStatusChild: EventEmitter<string> = new EventEmitter<string>();
  constructor(private loginService: LoginService,private cartDataService:CartDataService, private shoppingCartService: ShoppingCartService,private router: Router, private modalService: ModalService, public OAuth: AuthService) { }

  ngOnInit() {
  }
  public socialSignIn(socialProvider: string) {
    let socialPlatformProvider;
    if (socialProvider === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialProvider === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.OAuth.signIn(socialPlatformProvider).then(socialusers => {
      console.log(socialProvider, socialusers);
      console.log(socialusers);
      this.socialusers = socialusers;
      this.Savesresponse(this.socialusers);

    });
  }
  Savesresponse(socialusers: SocialUsers) {
    console.log(socialusers);
    // this.SocialloginService.Savesresponse(socialusers).subscribe((res: any) => {    
    //   console.log(res);    
    //   this.socialusers=res;    
    //   this.response = res.userDetail;    
    //   localStorage.setItem('socialusers', JSON.stringify( this.socialusers));    
    //   console.log(localStorage.setItem('socialusers', JSON.stringify(this.socialusers)));    
    //   this.router.navigate([`/Dashboard`]);    
    // })    
    //}    
  }
  ActivateTab(tab) {
    this.tabActive = tab;
  }

  CloseModal(modalName) {
    this.modalService.close(modalName);
  }
  Login(emailValid, pwdValid) {
    if (!emailValid)
      alert("Please enter valid email address");
    else if (!pwdValid)
      alert("Please enter valid password");
    else
      this.CallLoginService(this.userLoginEmail, this.userLoginPwd);
  }

  CallLoginService(userId, pwd) {
    this.loginService.CheckLogin(userId, pwd)
      .subscribe(
        loginResponse => {
          this.loginResponse = loginResponse;
          console.log("Login Response:" + loginResponse);
          if (this.loginResponse[0]["auth-status"] && this.loginResponse[0].user_id) {
            //this.LoginStatusChild.emit(userId);
            sessionStorage.setItem('userDetails', JSON.stringify(this.loginResponse[0]));
            sessionStorage.setItem('userKey', this.loginResponse[0].user_id);
            sessionStorage.setItem('userID', userId);
            this.modalService.close('SignInModal');
            this.GetProfileDetails(this.loginResponse[0].user_id);
            this.GetCartDetails(this.loginResponse[0].user_id);
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

  GetCartDetails(userId)
  {
    this.shoppingCartService.GetCartDetails(userId)
    .subscribe(
      cart => {
        this.cart = cart;
        console.log("Cart:" + JSON.stringify(cart));
        if (this.cart[0]["status"]=="true") {
          this.cartDataService.updateCart(this.cart);
          // this.cartDataService.changeSelectedCart(this.cart);
        }
      },
      errors => {
        console.log(errors);
        this.router.navigate(['/']);
      }
    );
  }
  Register(name, email, pwd) {
    if (!name)
      alert("Please enter name");
    else if (!email)
      alert("Please enter valid email address");
    else if (!pwd)
      alert("Please enter valid password");
    else
      this.CallRegisterService(this.userName, this.userLoginEmail, this.userLoginPwd);
  }

  CallRegisterService(userName, userId, pwd) {
    this.loginService.Register(userName, userId, pwd)
      .subscribe(
        registrationResponse => {
          this.loginResponse = registrationResponse;
          console.log("SignupResponse:" + registrationResponse[0]);
          if (this.loginResponse[0]["status"]) {
            // this.LoginStatusChild.emit(userId);
            sessionStorage.setItem('userID', userId);
            sessionStorage.setItem('userKey', this.loginResponse[0].user_id);
            this.GetProfileDetails(this.loginResponse[0].user_id);
            this.modalService.close('SignInModal');
          }
          else {
            alert(this.loginResponse[0]["error"]);
          }
        },
        errors => {
          console.log(errors);
          this.router.navigate(['/']);
        }
      );
  }

  GetProfileDetails(userKey) {
    this.loginService.GetCustomerDetails(userKey).subscribe(
      userInfo => {
        this.userInfo = userInfo[0][0];
        console.log(this.userInfo);
        sessionStorage.setItem('userName', this.userInfo.first_name);
        this.LoginStatusChild.emit(this.userInfo.first_name);
      },
      errors => {
        console.log(errors);
        alert(errors.error);
        this.router.navigate(['/']);
      }
    );
  }
}
