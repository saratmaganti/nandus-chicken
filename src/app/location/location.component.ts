import { Component, OnInit, NgZone, Output, EventEmitter, Input  } from '@angular/core';
import { ModalService } from '../core/services/modal.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  formattedAddress: string;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  @Input() locationdisplay:string;

  @Output()
  selectedAddress: EventEmitter<string> = new EventEmitter<string>();
  
  constructor(public zone: NgZone,private modalService: ModalService) {
   
   }
  ngOnInit() {
    
  }

  CloseModal(modalName) {
    this.modalService.close(modalName);
  }

  getAddress(place: object) {
    console.log("place"+ JSON.stringify(place['geometry']['location']));
    sessionStorage.setItem("LatLng",JSON.stringify(place['geometry']['location']))
    this.address = place['formatted_address'];
    this.formattedAddress = place['formatted_address'];
    this.selectedAddress.emit(this.formattedAddress);
    console.log("SelectedADD:" +this.formattedAddress);

    this.zone.run(() => this.formattedAddress = place['formatted_address']);
  }


  // Get Current Location Coordinates
   setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        // this.zoom = 8;
        sessionStorage.setItem("LatLng",JSON.stringify({"lat":this.latitude,"lng":this.longitude}))
        this.getCurrentAddress(this.latitude, this.longitude);
      });
    }
  }

  getCurrentAddress(latitude, longitude) {
    this.geoCoder = new google.maps.Geocoder;
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          // this.zoom = 12;
          this.address = results[0].formatted_address;
          this.selectedAddress.emit(this.address);
          // this.locationdisplay=this.address;
          console.log("FormattedAddress:" + this.address);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

}
