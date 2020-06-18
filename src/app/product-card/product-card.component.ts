import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../core/models/productInfo.model';
import { Router } from '@angular/router';
import { ProductDataService } from '../core/services/productdata.service';
import { WishListService } from '../core/services/wishList.service';
import { WishListResponse } from '../core/models/wishList.model';
import { ModalService } from '../core/services/modal.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  userId: string = '';
  wishListResponse: WishListResponse;
  constructor(private router: Router, private productDataService: ProductDataService, private wishListService: WishListService,private modalService: ModalService) { }

  ngOnInit() {
  }
  ShowProductInfo(Product) {
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
}
