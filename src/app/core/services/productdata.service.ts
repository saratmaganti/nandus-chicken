
import { Injectable } from '@angular/core';
import { Product } from '../models/productInfo.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ProductDataService {
    selectedProduct:Product;
    private selProductSource = new BehaviorSubject<Product>(this.selectedProduct);
    currentSelProduct = this.selProductSource.asObservable();
    constructor() {

    }
    changeSelectedProduct(product: Product) {
        this.selProductSource.next(product)
    }
}