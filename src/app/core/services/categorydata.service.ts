import { Injectable } from '@angular/core';
import { Categories } from '../models/categories.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CategoryDataService {
    selectedCategory:string;
    private categorySource = new BehaviorSubject<string>(this.selectedCategory);
    currentCategory = this.categorySource.asObservable();
    constructor() {

    }
    changeCategory(category: string) {
        this.categorySource.next(category)
    }
}