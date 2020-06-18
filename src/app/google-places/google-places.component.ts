import { Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { } from "googlemaps";
import { LocationDataService } from '../core/services/locationdata.service';

@Component({
    selector: 'AutocompleteComponent',
    template: `
      <input class="input google-places-autocomplete__input form-control"
        type="text"
        [(ngModel)]="autocompleteInput"
        #addresstext
        >
    `,
})
export class AutocompleteComponent implements OnInit, AfterViewInit {
    @Input() adressType: string;
    @Output() setAddress: EventEmitter<any> = new EventEmitter();
    @ViewChild('addresstext', { static: true }) addresstext: any;

     autocompleteInput: string;
    //  @Input('currentAddress') currentAddress:string;
    queryWait: boolean;

    constructor(private locationDataService:LocationDataService) {
        if (sessionStorage.Location != "undefined" && sessionStorage.Location != null) {
            this.autocompleteInput = sessionStorage.Location;
          }
    }

    ngOnInit() {
        this.locationDataService.locationCategory.subscribe(message => this.autocompleteInput = message)
    }

    ngAfterViewInit() {
        this.getPlaceAutocomplete();
        if (sessionStorage.Location != "undefined" && sessionStorage.Location != null) {
            this.autocompleteInput = sessionStorage.Location;
          }
    }

    private getPlaceAutocomplete() {
        const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
            {
                // componentRestrictions: { country: 'IN' },
                types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
            });
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            const place = autocomplete.getPlace();
            this.invokeEvent(place);
        });
    }

    invokeEvent(place: Object) {
        this.setAddress.emit(place);
    }

}
