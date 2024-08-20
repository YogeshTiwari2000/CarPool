import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonRow, IonCol, IonCardContent, IonAvatar, IonItem, IonBadge, IonLabel, ModalController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { HandleDataService } from 'src/app/services/data/handle-data.service';

@Component({
  selector: 'app-my-update',
  templateUrl: './my-update.page.html',
  styleUrls: ['./my-update.page.scss'],
  standalone: true,
  imports: [IonLabel, IonBadge, IonItem, IonAvatar, IonCardContent, IonCol, IonRow, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})


export class MyUpdatePage implements OnInit {
  journeyDuration: string | null = null;
  currentUserData: any;
  currentUser: any;
  userData: any;
  // userDataLength: number;

  constructor(private router: Router, private modalCtrl: ModalController, private commonService: CommonService,
    public localStr: LocalStorageService, private handleData: HandleDataService) {

  }

  ngOnInit() {

    this.updateRideStatuses();

    const currentUserEmail = this.commonService.currentUserEmail;


    // Retrieve data from Firebase and store it in local storage
    this.handleData.userExists(currentUserEmail).then((res) => {
      console.log("res.data === ", res.data);
      this.currentUserData = res.data;
      // console.log(this.currentUserData);
      console.log("current user data", this.currentUserData);
      this.currentUser = res.data

      if (this.currentUser) {
        this.userData = this.currentUser;

        const length = Object.keys(this.currentUser).length;
        console.log('currentUser length: ', length);

        // this.userDataLength = length

        console.log('currentUser: ', this.currentUser);

        const currentUserDocId = this.localStr.getItem("currentUserDocId");
        console.log("this.currentUser.wallet.balance === ", this.currentUser.wallet.balance);
      }
    })
  }
  updateRideStatuses() {
    const now = new Date();

    this.usersList.forEach((ride: any) => {
      const [endHours, endMinutes] = ride.journeyEnd.split(':').map(Number);
      const rideDate = new Date(`${ride.date.split('/').reverse().join('-')}T${endHours}:${endMinutes}:00`);

      if (rideDate <= now) {
        ride.rideStatus = 'completed';
      } else {
        ride.rideStatus = 'in-progress';
      }
    });
  }


  usersList: any = [
    {
      name: 'test1', designation: 'dg1', age: '21', profilePic: 'https://ionicframework.com/docs/img/demos/avatar.svg', rating: '1', date: '26/07/2024', journeyStart: '2:40', journeyEnd: '14:00', source: 's1',
      destination: 'd1', price: '100', seatAvl: '1', rideStatus: 'completed'
    },
    {
      name: 'test2', designation: 'dg2', age: '22', profilePic: 'https://ionicframework.com/docs/img/demos/avatar.svg', rating: '2', date: '24/07/2024', journeyStart: '3:25', journeyEnd: '5:00', source: 's2',
      destination: 'd2', price: '200', seatAvl: '2', rideStatus: 'in-progress'
    },
    {
      name: 'test3', designation: 'dg3', age: '43', profilePic: 'https://ionicframework.com/docs/img/demos/avatar.svg', rating: '3', date: '23/07/2024', journeyStart: '14:00', journeyEnd: '18:40', source: 's3',
      destination: 'd3', price: '300', seatAvl: '3', rideStatus: 'completed'
    },
    {
      name: 'test4', designation: 'dg4', age: '34', profilePic: 'https://ionicframework.com/docs/img/demos/avatar.svg', rating: '4', date: '21/07/2024', journeyStart: '17:00', journeyEnd: '22:00', source: 's4',
      destination: 'd4', price: '400', seatAvl: '4', rideStatus: 'cancel'
    },
  ];


  // calculateJourneyDuration(index: number) {
  //   const journeyStart = this.usersList[index].journeyStart;
  //   const journeyEnd = this.usersList[index].journeyEnd;
  //   const dateInData = this.usersList[index].date;

  //   // Create a Date object from the dateInData
  //   const [day, month, year] = dateInData.split('/').map(Number);
  //   const date = new Date(year, month - 1, day);

  //   // Set hours and minutes for journeyStart and journeyEnd
  //   const [startHours, startMinutes] = journeyStart.split(':').map(Number);
  //   const [endHours, endMinutes] = journeyEnd.split(':').map(Number);

  //   const start = new Date(date);
  //   start.setHours(startHours, startMinutes);

  //   const end = new Date(date);
  //   end.setHours(endHours, endMinutes);

  //   const diffMs = end.getTime() - start.getTime();

  //   const diffHrs = Math.floor(diffMs / 3600000); // 1 hour = 3600000 ms
  //   const diffMins = Math.round((diffMs % 3600000) / 60000); // 1 minute = 60000 ms

  //   // Format the duration as HH:MM
  //   const formattedHours = diffHrs.toString().padStart(2, '0');
  //   const formattedMinutes = diffMins.toString().padStart(2, '0');

  //   this.journeyDuration = `${formattedHours}h ${formattedMinutes}m`;
  //   console.log("this.journeyDuration", this.journeyDuration);
  // }
}
