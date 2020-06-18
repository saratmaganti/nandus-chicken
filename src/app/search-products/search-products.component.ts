import { Component, OnInit } from '@angular/core';
import { Product } from '../core/models/productInfo.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../core/services/products.service';
import { SearchDataService } from '../core/services/searchdata.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent {

  productsList: Product[];
  searchKey:string;
  constructor(private route: ActivatedRoute, private router: Router,private productService:ProductService,private searchDataService:SearchDataService) {
    this.searchDataService.currentSearchKey.subscribe(searchKey => {
      this.searchKey = searchKey;
      this.GetSearchProducts(this.searchKey);
    });
    // this.searchKey = JSON.parse(this.route.snapshot.paramMap.get("data"));
    // console.log("searchKey:"+this.searchKey);
    
  }


  GetSearchProducts(searchkey)
  {
    this.productService.getSearchProducts(searchkey)
    .subscribe(
      productsList => {
        this.productsList= productsList;
        console.log(productsList);
        if(productsList[0].error)
        {
         this.router.navigate(['/']);
        }
      },
      errors => {
        console.log(errors);
        this.router.navigate(['/']);
      }
    );

  }
  ShowProductInfo(Product)
  {
    this.router.navigate(['/productDetails', { data: JSON.stringify(Product) }], { skipLocationChange: true })
  }
}
