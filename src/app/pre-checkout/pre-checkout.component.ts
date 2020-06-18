import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../core/services/shopping-cart.service';
import { Cart } from '../core/models/shopping-cart.model';
import { CartDataService } from '../core/services/cartdata.service';
import { Router } from '@angular/router';
import { ProductService } from '../core/services/products.service';
import { Stock } from '../core/models/stock.model';

@Component({
  selector: 'app-pre-checkout',
  templateUrl: './pre-checkout.component.html',
  styleUrls: ['./pre-checkout.component.css']
})
export class PreCheckoutComponent implements OnInit {
  totalCart$: Cart[];
  cartInformation: Cart[];
  cart: Cart[];
  stock: Stock;
  stockCount: number;
  couponCode:string="";
  coupon_amnt:string;
  grand_total:string;
  constructor(private cartService: ShoppingCartService, private productService: ProductService, private router: Router, private shoppingCartService: ShoppingCartService, private cartDataService: CartDataService) {
    // this.cartDataService.getCartDetails().subscribe(
    //   cartDetails => {
    //     this.totalCart$ = cartDetails;
    //     if (this.totalCart$[0]["status"] == "true") {
    //       this.cartInformation = this.totalCart$[0]["result"];
    //       this.cartDataService.updateCart(this.totalCart$);
    //     }
    //   });
  }
  ngOnInit() {
    if (sessionStorage.getItem('userKey'))
      this.GetCartDetails();
  }

  GetCartDetails() {
    this.cartService.GetCartDetails(sessionStorage.getItem('userKey')).subscribe(
      cart => {
        this.totalCart$ = cart;
        console.log(cart);
        if (this.totalCart$[0]["status"] == "true") {
          this.cartInformation = this.totalCart$[0]["result"];
          this.cartDataService.updateCart(this.totalCart$);
        }
        else {
          alert("No products in the cart");
          // this.router.navigate(['/']);
        }
      },
      errors => {
        console.log(errors);
        alert("No products in the cart");
        // this.router.navigate(['/']);
      }
    );
  }
  RemoveCart(productId) {
    var userId = sessionStorage.getItem('userKey');
    this.shoppingCartService.RemoveCartService(userId, productId)
      .subscribe(
        cart => {
          this.cart = cart;
          console.log("Cart:" + JSON.stringify(cart));
          if (this.cart[0]["status"] == "true") {
            this.cartDataService.updateCart(this.cart);
            alert("Product removed successfully");
            if (this.cart[0]["result"].length > 0)
              this.GetCartDetails();
            else
              this.router.navigate(['/']);
          }
          else {
            alert("Product removed Failed");
          }
        },
        errors => {
          console.log(errors);
          this.router.navigate(['/']);
        }
      );
  }
  IncrementPrecheckQty(item) {
    var qty = parseInt(item.product_qty);
    if(!item.store_id)
     item.store_id="42OBV3FZ8F";
    this.getStockDetails(item.product_id, item.store_id);
    if (qty < this.stockCount) {
      qty = qty + 1;
    }
    this.AddtoCart(item.product_id, qty);
  }
  DecrementPrecheckQty(item) {
    var qty = parseInt(item.product_qty);
    if(!item.store_id)
     item.store_id="42OBV3FZ8F";
    this.getStockDetails(item.product_id, item.store_id);
    if (qty > 1) {
      qty = qty - 1;
    }
    this.AddtoCart(item.product_id, qty);
  }

  AddtoCart(productId, quantity) {
    var userId = sessionStorage.getItem('userKey');
    this.shoppingCartService.AddtoCartService(userId, productId, quantity)
      .subscribe(
        cart => {
          this.cart = cart;
          console.log("Cart:" + JSON.stringify(cart));
          if (this.cart[0]["status"] == "true") {
            this.cartDataService.updateCart(this.cart);
            this.GetCartDetails();
          }
          else {
            alert("Product updating Failed");
          }
        },
        errors => {
          console.log(errors);
          this.router.navigate(['/']);
        }
      );
  }
  getStockDetails(product_id, store_id) {
    this.productService.getStockCount(product_id, store_id)
      .subscribe(
        stock => {
          this.stock = stock;
          console.log(this.stock);
          if (stock[0].status == "true") {
            this.stockCount = parseInt(stock[0].stock);
          }
          else if (stock[0].status == "false") {
            this.stockCount = parseInt(stock[0].stock);
          }
          else if (stock[0].error) {
            this.stockCount = 0;
          }
          // this.stockCount = 10; // remove this 
        },
        errors => {
          console.log(errors);
          alert(errors.error);
          this.router.navigate(['/']);
        }
      );
  }

  ApplyCoupon()
  {
this.cartService.ApplyCoupon(sessionStorage.getItem('userKey'),this.couponCode).subscribe(
  cart => {
    this.totalCart$ = cart;
    console.log(cart);
    if (this.totalCart$[0]["status"] == "true") {
      alert(this.totalCart$[0]["message"]);
      this.grand_total = this.totalCart$[0]["grand_total"];
      this.coupon_amnt = this.totalCart$[0]["coupon_amnt"];
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

  NavigatetoAddresss()
  {
    this.router.navigate(['/address']);
  }
}
