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
  allRideLists: any[] = [];

  @ViewChild(IonModal)
  modal!: IonModal;
  currentUserData: any;
  minDate: string | undefined;
  from: any;
  to: any;
  errorMessage: string | undefined;
  // allUserData: Promise<{ [x: string]: { [x: string]: any; }; }[]>;

  constructor(private router: Router, private modalCtrl: ModalController, private commonService: CommonService,
    public localStr: LocalStorageService, private handleData: HandleDataService) {



    // this.allUserData = this.handleData.getData();
    // console.log(" this.allUserData === ", this.allUserData);
    console.log(this.allRideLists);

  }
  time: string = '';
  date: any = ''
  // time:any = ''
  passengers: number = 1;



  ngOnInit() {
    console.log("search page");

    const currentUserEmail = this.commonService.currentUserEmail;

    this.fetchAllRideLists()
    this.minDate = new Date().toISOString().split('T')[0];
  }

  async fetchAllRideLists() {
    try {
      const allRideLists = await this.handleData.getData();
      this.allRideLists = allRideLists;
      console.log('All Ride Lists:', this.allRideLists);
    } catch (error) {
      console.error('Error fetching ride lists:', error);
    }
  }

  isInputRequired: boolean = true;

  search() {
    if (!this.date || !this.time || this.passengers <= 0 || !this.from || !this.to) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    const searchData = {
      date: this.date,
      time: this.time,
      passengers: this.passengers
    };
    console.log(searchData);

    this.routes.navigate(['/home']);
  }


  incPassengers() {
    if (this.passengers < 7) {
      this.passengers++
    }
  }

  decPassengers() {
    if (this.passengers > 1) {
      this.passengers--
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    const passengersNumber = Number(this.passengers);
    const error = document.getElementById('errorHere');

    if (!isNaN(passengersNumber) && passengersNumber > 0 && passengersNumber <= 6) {
      this.modal.dismiss(this.passengers, 'confirm');
    } else {
      if (error) {
        if (isNaN(passengersNumber)) {
          error.textContent = `Please enter a valid number of passengerss.`;
        } else if (passengersNumber <= 0) {
          error.textContent = `The number of passengerss must be greater than 0.`;
        } else {
          error.textContent = `The number of passengerss must be less than or equal to 6.`;
        }
      }
    }
  }


}
