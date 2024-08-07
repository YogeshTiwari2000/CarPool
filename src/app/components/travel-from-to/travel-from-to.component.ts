declare var google: any;
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { IonCol, IonInput } from "@ionic/angular/standalone";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

@Component({
  selector: 'app-travel-from-to',
  templateUrl: './travel-from-to.component.html',
  styleUrls: ['./travel-from-to.component.scss'],
  standalone: true,
  imports: [IonInput, IonCol, FormsModule, CommonModule],
  providers: [GooglePlaceModule]
})
export class TravelFromToComponent implements OnInit {
  to: any
  from: any
  place: any
  constructor() {
    this.fromLocation()
    this.toLocation()
  }

  ngOnInit() {
    console.log("ngOnInit === ");
  }
  ionViewWillEnter() {
    console.log("ionViewWillEnter === ");
    this.fromLocation()
    this.toLocation()
  }
  swapLocations() {
    const temp = this.from;
    this.from = this.to;
    this.to = temp;
  }

  fromLocation() {
    let inputElement = document.getElementById('fromLocation');
    if (inputElement) {
      let input = inputElement.getElementsByTagName('input')[0];
      let autocomplete = new google.maps.places.Autocomplete(input, { types: ['geocode'], componentRestrictions: { country: 'in' } });
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        // retrieve the place object for your use
        let place = autocomplete.getPlace();
        console.log("google place called", place);
        this.from = place.formatted_address;
        // for (var i = 0; i < place.address_components.length; i++) {
        //   for (var j = 0; j < place.address_components[i].types.length; j++) {
        //     if (place.address_components[i].types[j] == "postal_code") {
        //       this.pincode = place.address_components[i].long_name;
        //     }
        //     if (place.address_components[i].types[j] == "locality") {
        //       this.city = place.address_components[i].long_name;
        //       console.log("enter in locality if", this.city);
        //     }
        //   }
        // }
        // this.locationName = place.formatted_address;
      });
    }
  }
  toLocation() {
    let inputElement = document.getElementById('toLocation');
    if (inputElement) {
      let input = inputElement.getElementsByTagName('input')[0];
      let autocomplete = new google.maps.places.Autocomplete(input, { types: ['geocode'], componentRestrictions: { country: 'in' } });
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        // retrieve the place object for your use
        let place = autocomplete.getPlace();
        console.log("google place called", place);
        this.to = place.formatted_address;
        // for (var i = 0; i < place.address_components.length; i++) {
        //   for (var j = 0; j < place.address_components[i].types.length; j++) {
        //     if (place.address_components[i].types[j] == "postal_code") {
        //       this.pincode = place.address_components[i].long_name;
        //     }
        //     if (place.address_components[i].types[j] == "locality") {
        //       this.city = place.address_components[i].long_name;
        //       console.log("enter in locality if", this.city);
        //     }
        //   }
        // }
        // this.locationName = place.formatted_address;
      });
    }
  }
}
