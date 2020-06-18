import { Component, OnInit, Input } from '@angular/core';
import {Product} from '../core/models/productInfo.model';
import {BestSeller} from '../core/services/bestseller.service';
import { Router } from '@angular/router';
import { ProductDataService } from '../core/services/productdata.service';
import { WishListResponse } from '../core/models/wishList.model';
import { WishListService } from '../core/services/wishList.service';
import { ModalService } from '../core/services/modal.service';
import { Cart } from '../core/models/shopping-cart.model';
import { ShoppingCartService } from '../core/services/shopping-cart.service';

@Component({
  selector: 'app-bestsaleproducts',
  templateUrl: './bestsaleproducts.component.html',
  styleUrls: ['./bestsaleproducts.component.css']
})
export class BestsaleproductsComponent implements OnInit {
  @Input('product') product: Product;
  @Input('width') width = '20';
  @Input('show-actions') showActions = true;
  // @Input('shopping-cart') shoppingCart: ShoppingCart;
  userId: string = '';
  wishListResponse: WishListResponse;
  cart:Cart[];
  productsInfo: Product[];
  constructor(private bestSeller: BestSeller,private shoppingCartService: ShoppingCartService,private router: Router,private productDataService:ProductDataService, private wishListService: WishListService,private modalService: ModalService) { }

  ngOnInit() {
    this.bestSeller.getAll()
    .subscribe(
      productsInfo => {
        this.productsInfo= productsInfo;
        console.log(productsInfo);
      },
      errors => {
        console.log(errors);
      }
    );
  }
  
    ShowProductInfo(Product)
    {
      this.productDataService.changeSelectedProduct(Product);
      this.router.navigate(['/productDetails'])
    }

    AddtoWhishList(product) {
      this.userId=sessionStorage.getItem('userKey');
      if(this.userId)
      {
      this.wishListService.AddtoWishListService(this.userId, product.Id)
        .subscribe(
          wishListResponse => {
            this.wishListResponse = wishListResponse;
            console.log("wishListResponse:" + wishListResponse[0]);
            if (this.wishListResponse[0]["status"]=="true") {
              alert(this.wishListResponse[0]["success"]);
            }
            else {
              alert(this.wishListResponse[0]["error"]);
            }
          },
          errors => {
            console.log(errors);
            this.router.navigate(['/']);
          }
        );
      }
      else{
        alert(" Please Login to add the product to the WishList");
        this.modalService.open('SignInModal');
      }
    }

//New method add to cart
  

   
}
