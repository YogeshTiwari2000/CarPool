import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCol, IonRow, IonButton, IonLabel, IonItem, IonIcon, IonButtons, IonMenuButton, IonTabButton, ModalController, IonModal, IonList } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { HandleDataService } from 'src/app/services/data/handle-data.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { CommonService } from 'src/app/shared/common.service';
import { EditRideComponent } from 'src/app/modals/edit-ride/edit-ride.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ride-detail-view',
  templateUrl: './ride-detail-view.page.html',
  styleUrls: ['./ride-detail-view.page.scss'],
  standalone: true,
  imports: [IonList, IonModal, IonTabButton, IonButtons, IonIcon, IonItem, IonLabel, IonButton, IonRow, IonCol, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton]
})
export class RideDetailViewPage implements OnInit {


  private handleData = inject(HandleDataService);
  localStorageService = inject(LocalStorageService);
  commonService = inject(CommonService);
  modalCtrl = inject(ModalController);


  ride: any;
  email: any;
  rideremail: any;
  currentUser: any;
  rideCreator: any;
  isEmailVerified: boolean = false;
  isPhoneVerified: boolean = false;
  status: any;
  passName: any
  currentUserDocId: any;
  userRideList: any;
  currentRideId: any;

  selectedRidePassengerList: any;

  constructor(private route: ActivatedRoute) { }

  subscription: Subscription | undefined;
  users: any[] = [];


  ngOnInit() {
    // Optional: Listen for incoming messages
    this.route.queryParams.subscribe(params => {
      if (params['ride']) {
        this.ride = JSON.parse(params['ride']);
        console.log('Ride Data:', this.ride);
        this.rideremail = this.ride.riderEmail
        // console.log("this.email === ", this.email);
        this.currentRideId = this.ride.id
        this.status = this.ride.status

        console.log(" this.status === ", this.status);
        console.log(" this.this.ride.currentUserDocId === ", this.ride.riderUserId);
        // console.log(" this.currentRideId === ", this.currentRideId);
      }
    });


    this.email = this.commonService.currentUserEmail;

    this.handleData
      .userExists(this.email)
      .then((result) => {
        if (result.isExist) {

          this.handleData.user = result.data;
          this.currentUser = this.handleData.user;
          this.currentUserDocId = this.localStorageService.getItem("currentUserDocId");
          console.log("currentUser hero === ", this.currentUser);
          this.isEmailVerified = this.currentUser.email_verified
          // console.log(" this.isEmailVerified === ", this.isEmailVerified);
          this.userRideList = this.handleData.getAllRideLists()
          // this.userRideList = this.currentUser.ride.rideList
          // console.log("this.userRideList === ", this.userRideList);
        } else {
          console.log("User not found");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // for ride creater
    this.handleData
      .userExists(this.rideremail)
      .then((result) => {
        if (result.isExist) {

          this.handleData.user = result.data;
          this.rideCreator = this.handleData.user;
          console.log(" this.rideCreator sholet === ", this.rideCreator);
        } else {
          console.log("User not found");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });



    // // change detech code 


    this.subscription = this.handleData.subscribeToAllRideLists("vkOkXi5KrdBHdhDJ8IjZ").subscribe((data) => {
      console.log("Changes detected for all users:", data);

      // Filter the data to get only the document with the specific ID
      const userWithSpecificId = data.find((user: any) => user.id === "vkOkXi5KrdBHdhDJ8IjZ");

      if (userWithSpecificId) {
        console.log("Changes detected for user with ID vkOkXi5KrdBHdhDJ8IjZ:", userWithSpecificId);
        console.log("userWithSpecificId.ride === ", userWithSpecificId.ride);
        console.log("userWithSpecificId.ride.rideList === ", userWithSpecificId.ride.rideList);

        const matchedRideDetect = userWithSpecificId.ride.rideList.find((ride: { id: string; }) => ride.id === this.currentRideId);
        console.log("matchedRideDetect.passengerList00 === ", matchedRideDetect.passengerList);
        this.selectedRidePassengerList = matchedRideDetect.passengerList
        // if (matchedRideDetect.passengerList) {
        //   console.log('passengerList me change hua h '); 

        //   this.sendNotification();
        // }

      } else {
        console.log("No changes detected for user with ID vkOkXi5KrdBHdhDJ8IjZ.");
      }

      this.users = data;  // Update the users with the current data
      // this.onNodesChanged(data);  // Trigger a function when nodes change
    });



  }


  async editRide() {

    const modal = await this.modalCtrl.create({
      component: EditRideComponent,
      cssClass: ["editRideModalCss"],
      componentProps: { currentRideData: this.ride }
    });

    // Handle the data returned from the modal
    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.updatedRide) {
        // Update the ride data with the new values
        this.ride = result.data.updatedRide;
        console.log('Updated Ride Data:', this.ride);

        // Update the display or perform any other actions as needed
        this.calculateTotalPrice();
      }
    });

    modal.present();
  }



  async acceptRequest(index: any) {
    const selectedPass = this.selectedRidePassengerList[index]
    this.passName = selectedPass.passName
    this.acceptNotification()

  }
  async rejectRequest(index: any) {
    const selectedPass = this.selectedRidePassengerList[index]
    this.passName = selectedPass.passName
    console.log("index === ", index);
    this.rejectNotification()
  }

  async acceptNotification() {
    this.commonService.sendNotification('carpool', 'noti', '/profile', 'accept ride of ' + this.passName, "krle");

  };
  async rejectNotification() {
    this.commonService.sendNotification('carpool', 'noti ', '/profile', 'reject ride of ' + this.passName, "mt kr");
  };


  async cancelRide() {
    const matchedRide = this.userRideList.find((ride: { id: string; }) => ride.id === this.currentRideId);
    console.log("matchedRide === ", matchedRide);
    if (matchedRide) {
      matchedRide.status = 'canceled'
      console.log(" matchedRide.status === ", matchedRide.status);
      this.status = matchedRide.status
      this.handleData.updateDocumentField(this.currentUserDocId, 'ride', this.currentUser.ride)
    } else {
      console.log('not able to cancel the ride');
    }
    this.modalCtrl.dismiss();
  }

  async bookRide() {
    const matchedRide = this.userRideList.find((ride: { id: string; }) => ride.id === this.currentRideId);
    console.log("matchedRide === ", matchedRide)
    if (matchedRide) {
      // matchedRide.status = 'requested'
      // console.log(" matchedRide.status === ", matchedRide.status);
      // this.status = matchedRide.status
      // this.handleData.updateDocumentField(this.currentUserDocId, 'ride', this.currentUser.ride)

      // to move ride to my updates 
      const immutableride = Object.freeze({ ...matchedRide });
      console.log("immutableride === ", immutableride);
      this.currentUser.ride.rideList.unshift(immutableride);
      this.handleData.updateDocumentField(this.currentUserDocId, 'ride', this.currentUser.ride)

      // for notification 

      if (this.ride.passengerList != undefined) {

        console.log('passenger h ');
        const passenger = {
          passName: this.currentUser.userName,
          passId: this.currentUserDocId,
          passEmail: this.currentUser.userEmail,
          passStatus: 'Requested',
        }


        const immutablePassenger = Object.freeze({ ...passenger });
        matchedRide.passengerList.unshift(immutablePassenger);

        // Find the index of the ride to replace
        const rideIndex = this.rideCreator.ride.rideList.findIndex((ride: { id: string; }) => ride.id === this.currentRideId);

        if (rideIndex !== -1) {
          this.rideCreator.ride.rideList[rideIndex] = matchedRide;
          this.handleData.updateDocumentField(this.ride.riderUserId, 'ride', this.rideCreator.ride);
        } else {
          console.log("Ride to replace not found!");
        }


      } else {
        console.log('koi nhi h create kro');
      }


    } else {
      console.log('not able to book the ride');
    }
  }

  calculateTotalPrice(): number {
    console.log("this.ride.price * this.ride.seatAvl === ", this.ride.price * this.ride.seatAvl);
    return this.ride.price * this.ride.seatAvl;
  }


  ionViewWillEnter() {
    this.calculateTotalPrice();
  }

  // old pages function for future use || start

  dateFormat(dateString: string): string {
    const date = new Date(dateString);
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const weekday = weekdays[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];

    return `${weekday} ${day} ${month}`;
  }



  calculateEndTime(userInfo: any): string {
    const time = userInfo['time']; // e.g., "15:27"
    console.log("time === ", time);
    const duration = userInfo['duration']; // e.g., "1 day 5 hours"
    console.log("duration === ", duration);

    // Parse start time
    const [startHours, startMinutes] = time.split(':').map(Number);

    // Parse duration
    const durationDaysMatch = duration.match(/(\d+)\s*day/);
    const durationHoursMatch = duration.match(/(\d+)\s*hour/);
    const durationMinsMatch = duration.match(/(\d+)\s*mins/);

    const durationDays = durationDaysMatch ? parseInt(durationDaysMatch[1], 10) : 0;
    const durationHours = durationHoursMatch ? parseInt(durationHoursMatch[1], 10) : 0;
    const durationMinutes = durationMinsMatch ? parseInt(durationMinsMatch[1], 10) : 0;

    // Calculate end time
    let endHours = startHours + durationHours;
    let endMinutes = startMinutes + durationMinutes;
    let endDays = durationDays;

    // Handle overflow of minutes
    if (endMinutes >= 60) {
      endMinutes -= 60;
      endHours += 1;
    }

    // Handle overflow of hours
    if (endHours >= 24) {
      endHours -= 24;
      endDays += 1;
    }

    // Format the final time
    const formattedEndHours = endHours.toString().padStart(2, '0');
    const formattedEndMinutes = endMinutes.toString().padStart(2, '0');

    // If days are involved, include them in the output
    const endTime = endDays > 0
      ? `${endDays} day(s) ${formattedEndHours}:${formattedEndMinutes}`
      : `${formattedEndHours}:${formattedEndMinutes}`;

    return endTime;
  }



  async startRideNotification() {
    this.commonService.sendNotification('carpool', '', '/ride-detail-view', "driver start the ride", "start hogi");
  };

}
