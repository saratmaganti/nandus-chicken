import { Component, OnInit } from '@angular/core';
import { StoresService } from '../core/services/stores.service';
import { Store } from '../core/models/Store.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})

export class StoresComponent implements OnInit {
  lat: number;
  lng: number;
  mapLocation: string;
  stores: Store[];
  constructor(private storesService: StoresService, private router: Router) { 
    // this.lat=12.9716;
    // this.lng=77.5946;
  }

  ngOnInit() {
    this.storesService.getAllstores().subscribe(
      stores => {
        this.stores = stores;
        console.log(stores);
        this.lat = parseFloat(this.stores[0].store_latitude);
        this.lng = parseFloat(this.stores[0].store_longitude);
        if (stores[0].error) {
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


  GetMap(store) {
    this.lat = parseFloat(store.store_latitude);
    this.lng = parseFloat(store.store_longitude);
  }
}
