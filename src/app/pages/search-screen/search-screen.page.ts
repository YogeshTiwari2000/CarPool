import { Component, OnInit , ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonCol, IonInput, IonButton, IonItem, IonLabel, IonModal, IonDatetime, IonDatetimeButton } from '@ionic/angular/standalone';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
declare var google:any;

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.page.html',
  styleUrls: ['./search-screen.page.scss'],
  standalone: true,
  imports: [IonDatetimeButton, IonDatetime,  IonModal, IonLabel, IonItem, IonButton, IonInput, IonCol, IonRow, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  providers:[GooglePlaceModule]
})
export class SearchScreenPage implements OnInit {

  constructor() { }


  ngOnInit() {
    console.log("search page");
    
  }



  swapLocations() {
    const temp = this.from;
    this.from = this.to;
    this.to = temp;
  }

  to:any
  from:any
  ionViewWillEnter() {
    this.fromLocation()
    this.toLocation()
  }

  fromLocation(){
    let inputElement = document.getElementById('fromLocation');
    if (inputElement) {
      let input = inputElement.getElementsByTagName('input')[0];
   let autocomplete = new google.maps.places.Autocomplete(input, { types: ['geocode'], componentRestrictions: { country: 'in' } });
   google.maps.event.addListener(autocomplete, 'place_changed', () => {
     // retrieve the place object for your use
     let place = autocomplete.getPlace();
     console.log("google place called", place);
     // this.region = place.formatted_address;
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
  toLocation(){
    let inputElement = document.getElementById('toLocation');
    if (inputElement) {
      let input = inputElement.getElementsByTagName('input')[0];
   let autocomplete = new google.maps.places.Autocomplete(input, { types: ['geocode'], componentRestrictions: { country: 'in' } });
   google.maps.event.addListener(autocomplete, 'place_changed', () => {
     // retrieve the place object for your use
     let place = autocomplete.getPlace();
     console.log("google place called", place);
     // this.region = place.formatted_address;
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
  increment() {
    const counterElement = document.getElementById('counter');
    if (counterElement !== null) {
      let currentValue = parseInt(counterElement.textContent || "0"); 
      counterElement.textContent = `${currentValue + 1} passenger`;
    }
  }
  decrement() {
    const counterElement = document.getElementById('counter');
    if (counterElement !== null) {
      let currentValue = parseInt(counterElement.textContent || "0");
      if (currentValue > 0) {
        counterElement.textContent = `${currentValue - 1} passenger`;
      }
    }
  }
  
}
