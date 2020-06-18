import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../core/services/category.service';
import { Categories } from '../core/models/categories.model';
import { Router } from '@angular/router';
import { CategoryDataService } from '../core/services/categorydata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Categories[];
  constructor(private categoryService: CategoryService,private router:Router,private categoryDataService:CategoryDataService) { }

  ngOnInit() {
    this.categoryService.currentCategories.subscribe(categories => {
      this.categories = categories;
    });
  }
  GetProductsByCategoryId(category:Categories)
  {
    this.categoryDataService.changeCategory(category.id);
    this.router.navigate(['/product']);
  }
}
