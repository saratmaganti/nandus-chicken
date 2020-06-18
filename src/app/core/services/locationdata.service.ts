import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LocationDataService {
    place:string;
    private locationSource = new BehaviorSubject<string>(this.place);
    locationCategory = this.locationSource.asObservable();
    constructor() {

    }
    changeLocation(category: string) {
        this.locationSource.next(category)
    }
}