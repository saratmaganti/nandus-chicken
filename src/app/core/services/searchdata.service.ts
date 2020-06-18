import { Injectable } from '@angular/core';
import { Product } from '../models/productInfo.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SearchDataService {
    searchKey:string;
    private searchSource = new BehaviorSubject<string>(this.searchKey);
    currentSearchKey = this.searchSource.asObservable();
    constructor() {

    }
    changeSearch(searchKey: string) {
        this.searchSource.next(searchKey)
    }
}