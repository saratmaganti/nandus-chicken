import { Component, OnInit } from '@angular/core';
import { Product } from '../core/models/productInfo.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductDataService } from '../core/services/productdata.service';
import { ProductService } from '../core/services/products.service';
import { Variant } from '../core/models/variant.model';
import { Stock } from '../core/models/stock.model';
import { ShoppingCartService } from '../core/services/shopping-cart.service';
import { ModalService } from '../core/services/modal.service';
import { Cart } from '../core/models/shopping-cart.model';
import { CartDataService } from '../core/services/cartdata.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productInfo: Product;
  stockAvailability: string = "";
  variant: Variant;
  stock: Stock;
  qty: number = 1;
  stockCount: number=0;
  userId: string = '';
  cart:Cart[];
  constructor(private route: ActivatedRoute,private cartDataService:CartDataService, private router: Router,private shoppingCartService: ShoppingCartService,private modalService: ModalService, private productService: ProductService, private productDataService: ProductDataService) {
    this.productDataService.currentSelProduct.subscribe(product => {
      this.productInfo = product;
      if (this.productInfo) {
        sessionStorage.setItem('product', JSON.stringify(this.productInfo));
        this.stockCount=+this.productInfo.stock;
      }
      else {
        this.productInfo = JSON.parse(sessionStorage.getItem('product'));
        if(this.productInfo)
         this.stockCount=+this.productInfo.stock;
      }
      console.log(this.productInfo);
      // this.CheckStockAvailability(this.productInfo.variants);
      // this.getStockDetails(this.productInfo.variants, this.productInfo.id, this.productInfo.store_id)
    });
    // this.productInfo = JSON.parse(this.route.snapshot.paramMap.get("data"));
  }

  // CheckStockAvailability(variant_id) {
  //   this.productService.getStockAvailability(variant_id)
  //     .subscribe(
  //       variant => {
  //         this.variant = variant;
  //         console.log(this.variant);
  //         if (variant[0].error) {
  //           this.stockAvailability = "Out of Stock";
  //         }
  //         else {
  //           this.stockAvailability = "In Stock";

  //         }
  //       },
  //       errors => {
  //         console.log(errors);
  //         alert(errors.error);
  //         this.router.navigate(['/']);
  //       }
  //     );
  // }

  // getStockDetails(variant_id, product_id, store_id) {
  //   this.productService.getStockCount(variant_id, product_id, store_id)
  //     .subscribe(
  //       stock => {
  //         this.stock = stock;
  //         console.log(this.stock);
  //         if (stock[0].status == "true") {
  //           this.stockCount = parseInt(stock[0].stock);
  //         }
  //         else if (stock[0].status == "false") {
  //           this.stockCount = parseInt(stock[0].stock);
  //         }
  //         else if (stock[0].error) {
  //           this.stockCount = 0;
  //         }
  //         // this.stockCount = 10; // remove this 
  //       },
  //       errors => {
  //         console.log(errors);
  //         alert(errors.error);
  //         this.router.navigate(['/']);
  //       }
  //     );
  // }
  IncrementQty() {
    if (this.qty < this.stockCount) {
      this.qty = this.qty + 1;
    }
  }
  DecrementQty() {
    if (this.qty > 1) {
      this.qty = this.qty - 1;
    }
  }

  AddItemtoCart(product,quantity) {
    debugger;
    this.userId=sessionStorage.getItem('userKey');
    if(this.userId)
    {
      this.AddtoCart(this.userId,product,quantity);
    }
    else{
      alert(" Please Login to add the product to the WishList");
      this.modalService.open('SignInModal');
    }
  }
  AddtoCart(userId,productId,quantity)
  {
    debugger;
    this.shoppingCartService.AddtoCartService(userId, productId,quantity)
    .subscribe(
      cart => {
        this.cart = cart;
        console.log("Cart:" + JSON.stringify(cart));
        if (this.cart[0]["status"]=="true") {
          //add to cart details
          // this.cartDataService.changeSelectedCart(this.cart);
          this.cartDataService.updateCart(this.cart);
          alert("Product added successfully");
        }
        else {
          alert("Product adding Failed");
        }
      },
      errors => {
        console.log(errors);
        this.router.navigate(['/']);
      }
    );
  }
}
