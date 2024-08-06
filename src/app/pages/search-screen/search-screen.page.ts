import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OverlayEventDetail } from '@ionic/core/components';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonCol, IonInput, IonButton, IonItem, IonLabel, IonModal, IonDatetime, IonDatetimeButton, IonIcon, IonButtons, IonMenuButton, IonImg } from '@ionic/angular/standalone';

import { Router } from '@angular/router';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
declare var google: any;

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.page.html',
  styleUrls: ['./search-screen.page.scss'],
  standalone: true,
  imports: [IonImg, IonButtons, IonIcon, IonDatetimeButton, IonDatetime, IonModal, IonLabel, IonItem, IonButton, IonInput, IonCol, IonRow, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton],
  providers: [GooglePlaceModule]
})
export class SearchScreenPage implements OnInit {
  @ViewChild(IonModal)
  modal!: IonModal;
  constructor() { }
  time: string = '12:00';
  date: any = ''
  // time:any = ''
  passengers: number = 2;

  ngOnInit() {
    console.log("search page");
  }



  swapLocations() {
    const temp = this.from;
    this.from = this.to;
    this.to = temp;
  }

  isInputRequired: boolean = true;
  to: any
  from: any
  place: any

  ionViewWillEnter() {
    this.fromLocation()
    this.toLocation()
  }

  search() {
    const searchData = {
      from: this.from,
      to: this.to,
      date: this.date,
      time: this.time,
      passengers: this.passengers
    };
    console.log(searchData);
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
  increment() {
    const counterElement = document.getElementById('open-modal-addPassanger');
    if (counterElement !== null) {
      let currentValue = parseInt(counterElement.textContent || "0");
      if (currentValue < 6) {
        counterElement.textContent = `${currentValue + 1} passenger`;
        this.passengers++;
      }
    }
  }
  decrement() {
    const counterElement = document.getElementById('open-modal-addPassanger');
    if (counterElement !== null) {
      let currentValue = parseInt(counterElement.textContent || "0");
      if (currentValue > 0) {
        counterElement.textContent = `${currentValue - 1} passenger`;
        this.passengers--;
      }
    }
  }
  passanger: Number | undefined;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.passanger, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    const counterElement = document.getElementById('open-modal-addPassanger');
    if (ev.detail.role === 'confirm') {
      const passengerNumber = Number(this.passanger);
      console.log("passanger === ", this.passanger);
      console.log(" counterElement?.textContent === ", counterElement?.textContent);
      if (!isNaN(passengerNumber) && passengerNumber < 6) {

        counterElement!.textContent = `${this.passanger} passenger`;
      } else {
        alert('passanger must be less than or equal to 6')
      }
    }
  }
}
