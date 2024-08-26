import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OverlayEventDetail } from '@ionic/core/components';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonCol, IonInput, IonButton, IonItem, IonLabel, IonModal, IonDatetime, IonDatetimeButton, IonIcon, IonButtons, IonMenuButton, IonImg, IonBackButton, ModalController } from '@ionic/angular/standalone';

import { Router } from '@angular/router';
import { TravelFromToComponent } from 'src/app/components/travel-from-to/travel-from-to.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonService } from 'src/app/shared/common.service';
import { HandleDataService } from 'src/app/services/data/handle-data.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.page.html',
  styleUrls: ['./search-screen.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonImg, IonButtons, IonIcon, IonDatetimeButton, IonDatetime, IonModal, IonLabel, IonItem, IonButton, IonInput, IonCol, IonRow, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton, TravelFromToComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SearchScreenPage implements OnInit {

  routes = inject(Router)

  @ViewChild(IonModal)
  modal!: IonModal;
  currentUserData: any;
  allUserData: Promise<{ [x: string]: { [x: string]: any; }; }[]>;
  constructor(private router: Router, private modalCtrl: ModalController, private commonService: CommonService,
    public localStr: LocalStorageService, private handleData: HandleDataService) {

    this.allUserData = this.handleData.getData();
    console.log(" this.allUserData === ", this.allUserData);

  }
  time: string = '12:00';
  date: any = ''
  // time:any = ''
  passengers: number = 2;

  ngOnInit() {
    console.log("search page");

    const currentUserEmail = this.commonService.currentUserEmail;
  }

  isInputRequired: boolean = true;

  search() {
    const searchData = {
      // from: this.from,
      // to: this.to,
      date: this.date,
      time: this.time,
      passengers: this.passengers
    };
    console.log(searchData);

    this.routes.navigate(['/home'])
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
    const passengerNumber = Number(this.passanger);
    const error = document.getElementById('errorHere');

    if (!isNaN(passengerNumber) && passengerNumber > 0 && passengerNumber <= 6) {
      this.modal.dismiss(this.passanger, 'confirm');
    } else {
      if (error) {
        if (isNaN(passengerNumber)) {
          error.textContent = `Please enter a valid number of passengers.`;
        } else if (passengerNumber <= 0) {
          error.textContent = `The number of passengers must be greater than 0.`;
        } else {
          error.textContent = `The number of passengers must be less than or equal to 6.`;
        }
      }
    }
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    const counterElement = document.getElementById('open-modal-addPassanger');
    const error = document.getElementById('errorHere');
    if (ev.detail.role === 'confirm') {
      const passengerNumber = Number(this.passanger);
      console.log("passanger === ", this.passanger);
      console.log(" counterElement?.textContent === ", counterElement?.textContent);
      if (!isNaN(passengerNumber)) {
        error!.textContent = `please enter the number of passanger`;
      }
      else if (passengerNumber < 6) {
        counterElement!.textContent = `${this.passanger} passenger`;
      } else {
        error!.textContent = `passanger must be less than 6`;
      }
    }
  }

}
