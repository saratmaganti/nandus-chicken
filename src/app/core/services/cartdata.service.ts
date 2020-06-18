
import { Injectable } from '@angular/core';
import { Cart } from '../models/shopping-cart.model';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartDataService {
    // cart:Cart[];
    private cart = new Subject<any>();

    updateCart(cart: Cart[]) {
        this.cart.next(cart);
    }

    getCartDetails(): Observable<any> {
        return this.cart.asObservable();
    }
    // private updatedCart = new BehaviorSubject<Cart[]>(this.cart);
    // currentUpdatedCart= this.updatedCart.asObservable();
    // constructor() {

    // }
    // changeSelectedCart(cart: Cart[]) {
    //     this.updatedCart.next(cart)
    // }
}