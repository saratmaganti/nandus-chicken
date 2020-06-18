import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { Categories } from '../models/categories.model';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class CategoryService {
  category: Categories[];
  private categoriesSource = new BehaviorSubject<Categories[]>(this.category);
  currentCategories = this.categoriesSource.asObservable();
  constructor(private apiService: ApiService) { }

  changeCategories(categories: Categories[]) {
    this.categoriesSource.next(categories)
  }
  getAll(): Observable<Categories[]> {
    return this.apiService.get(`${environment.category_url}`)
      .pipe(map(data => data.category_info));
  }

}
