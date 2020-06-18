import { Component, OnInit } from '@angular/core';
import { Product } from '../core/models/productInfo.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../core/services/products.service';
import { CategoryDataService } from '../core/services/categorydata.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productsList: Product[];
  categoryId:string;
  constructor(private route: ActivatedRoute, private router: Router,private productService:ProductService,private categoryDataService: CategoryDataService) {
    
  }
  ngOnInit()
  {
    this.categoryId="";
    this.categoryDataService.currentCategory.subscribe(categoryId => {
      this.categoryId = categoryId;
      console.log("categoryId:"+categoryId);
      if(this.categoryId){
      this.GetProduct(this.categoryId);
      }
      else
      {
        this.GetAllProducts();
      }
    });
  }

  GetAllProducts()
  {
   var LatLng=JSON.parse(sessionStorage.getItem("LatLng"));
   console.log(LatLng);
    this.productService.getAllProducts(LatLng.lat,LatLng.lng).subscribe(
      productsList => {
        this.productsList= productsList;
        console.log(productsList);
        if(productsList[0].error)
        {
          alert("No products available in this location");
         this.router.navigate(['/']);
        }
      },
      errors => {
        console.log(errors);
        alert(errors.error);
        this.router.navigate(['/']);
      }
    );
  }
  GetProduct(categoryId:string)
  {
    var LatLng=JSON.parse(sessionStorage.getItem("LatLng"));
   console.log("GetProduct"+LatLng);
    this.productService.getProductsByCategory(categoryId,LatLng.lat,LatLng.lng)
      .subscribe(
        productsList => {
          this.productsList= productsList;
          console.log(productsList);
          if(productsList[0].error)
          {
            alert("No products available in this location");
         this.router.navigate(['/']);
           // this.GetAllProducts();
          //  this.router.navigate(['/']);
          }
        },
        errors => {
          console.log(errors);
          alert(errors.error);
          this.router.navigate(['/']);
        }
      );
  }

}
