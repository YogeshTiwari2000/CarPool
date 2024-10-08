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
  rideCreatorDocId: any;
  isEmailVerified: boolean = false;
  isPhoneVerified: boolean = false;
  status: any;
  passName: any
  passId: any
  passEmail: any
  currentUserDocId: any;
  userRideList: any;
  currentRideId: any;
  bookRideBtn: boolean = false;
  selectedRidePassengerList: any;
  passData: any;

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
        this.rideCreatorDocId = this.ride.riderUserId
        // console.log("this.email === ", this.email);
        this.currentRideId = this.ride.id
        this.status = this.ride.status

        this.selectedRidePassengerList = this.ride.passengerList;
        console.log(" this.status === ", this.status);
        console.log("this.ride.riderUserId === ", this.ride.riderUserId);
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
          console.log("this.currentUserDocId 2222222=== ", this.currentUserDocId);
          console.log("currentUser   === ", this.currentUser);
          this.isEmailVerified = this.currentUser.email_verified
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
      .userExists(this.rideremail, false)
      .then((result) => {
        if (result.isExist) {

          this.handleData.user = result.data;
          this.rideCreator = this.handleData.user;
          console.log(" this.rideCreator   === ", this.rideCreator);

        } else {
          console.log("User not found");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  async bookRide() {
    const matchedRide = this.rideCreator.ride.rideList.find((ride: { id: string; }) => ride.id === this.currentRideId);
    console.log("matchedRide === ", matchedRide)
    const rideinCurrentUserRideList = this.currentUser.ride.rideList.find((ride: { id: string; }) => ride.id === this.currentRideId);
    console.log("rideinCurrentUserRideList === ", rideinCurrentUserRideList);
    if (matchedRide) {
      // to move ride to my updates 
      if (rideinCurrentUserRideList == undefined) {
        console.log('current user ki ridelist me ride nhi thi, add ho gyii');
        this.currentUser.ride.rideList.unshift(this.handleData.clone(matchedRide));
        this.handleData.updateDocumentField(this.currentUserDocId, 'ride', this.currentUser.ride)
      }
      this.bookRideBtn = true;
      if (this.ride.passengerList != undefined) {

        console.log('passenger h ');

        const rideIndex = this.rideCreator.ride.rideList.findIndex((ride: { id: string; }) => ride.id === this.currentRideId);
        console.log("rideIndex === ", rideIndex);
        console.log("current ride === ", this.rideCreator.ride.rideList[rideIndex]);

        const currentRidePassangerList = this.rideCreator.ride.rideList[rideIndex].passengerList
        console.log("currentRidePassangerList === ", currentRidePassangerList);

        let currentUserExistInPassList = currentRidePassangerList.find((obj: { passId: any; }) => obj.passId === this.currentUserDocId);
        console.log("currentUserExistInPassList === ", currentUserExistInPassList);

        console.log("this.rideCreator.notificationList === ", this.rideCreator.notificationList);

        const notificationMessage = {
          senderName: this.currentUser.userName,
          status: 'Requested',
          message: 'Requested a Ride',
          rideid: this.currentRideId,
          url: 'profile'
        }

        if (currentUserExistInPassList != undefined) {
          // this.rideCreator.notificationList.unshift(this.handleData.clone(notificationMessage));
          if (this.rideCreator.isNotification == true) {
            this.rideCreator.notificationList.unshift(this.handleData.clone(notificationMessage));
          } else {
            this.rideCreator.notificationList = [notificationMessage]
          }
          this.handleData.updateDocumentField(this.ride.riderUserId, 'notificationList', this.rideCreator.notificationList);
          currentUserExistInPassList.passStatus = "Requested"
          this.handleData.updateDocumentField(this.ride.riderUserId, 'ride', this.rideCreator.ride);
          this.handleData.updateDocumentField(this.ride.riderUserId, 'isNotification', true);

        } else {
          const passenger = {
            passName: this.currentUser.userName,
            passId: this.currentUserDocId,
            passEmail: this.currentUser.userEmail,
            passStatus: "Requested",
          }
          const immutablePassenger = Object.freeze({ ...passenger });
          console.log("immutablePassenger === ", immutablePassenger);
          matchedRide.passengerList.unshift(immutablePassenger);
          console.log(" matchedRide.passengerList === ", matchedRide.passengerList);
          console.log("currentRidePassangerList  === ", currentRidePassangerList);
          // Find the index of the ride to replace 
          // this.handleData.updateDocumentField(this.ride.riderUserId, 'ride', this.rideCreator.ride); 
          if (rideIndex !== -1) {

            if (this.rideCreator.isNotification == true) {
              this.rideCreator.notificationList.unshift(this.handleData.clone(notificationMessage));
            } else {
              this.rideCreator.notificationList = [notificationMessage]
            }
            this.handleData.updateDocumentField(this.ride.riderUserId, 'notificationList', this.rideCreator.notificationList);
            this.rideCreator.ride.rideList[rideIndex] = matchedRide;
            this.handleData.updateDocumentField(this.ride.riderUserId, 'ride', this.rideCreator.ride);
            this.handleData.updateDocumentField(this.ride.riderUserId, 'isNotification', true);

          } else {
            console.log("Ride to replace not found!");
          }
        }
      } else {
        console.log('koi nhi h create kro');
      }

    } else {
      console.log('not able to book the ride');
    }
  }

  async cancelRide() {
    const matchedRide = this.rideCreator.ride.rideList.find((ride: { id: string; }) => ride.id === this.currentRideId);
    console.log("matchedRide cancel wali === ", matchedRide);

    const notificationMessage = {
      senderName: this.currentUser.userName,
      status: 'cancelled',
      message: 'cancelled a Ride',
      rideid: this.currentRideId,
      url: 'profile'
    }

    if (matchedRide) {
      const currentRidePassangerList = this.handleData.clone(matchedRide.passengerList);
      console.log("matchRidePassList cancel wali === ", currentRidePassangerList);
      const currentUserExistInPassList = currentRidePassangerList.find((obj: { passId: any; }) => obj.passId === this.currentUserDocId);
      console.log("currentUserExistInPassList cancel wali === ", currentUserExistInPassList);

      if (currentUserExistInPassList) {
        const updatedPassengerList = currentRidePassangerList.map((obj: { passId: any; passStatus: string; }) => {
          if (obj.passId === this.currentUserDocId) {
            return { ...obj, passStatus: "cancelled" };
          }
          return obj;
        });
        // this.rideCreator.notificationList.unshift(this.handleData.clone(notificationMessage));

        if (this.rideCreator.isNotification == true) {
          this.rideCreator.notificationList.unshift(this.handleData.clone(notificationMessage));
        } else {
          this.rideCreator.notificationList = [notificationMessage]
        }

        this.handleData.updateDocumentField(this.ride.riderUserId, 'notificationList', this.rideCreator.notificationList);
        matchedRide.passengerList = this.handleData.clone(updatedPassengerList);
        this.handleData.updateDocumentField(this.ride.riderUserId, 'ride', this.rideCreator.ride);
        this.handleData.updateDocumentField(this.ride.riderUserId, 'isNotification', true);
      }
    }


    this.modalCtrl.dismiss();
  }

  async waitForCurrentUserDocId() {
    while (this.currentUserDocId === undefined) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
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
    const selectedPass = this.selectedRidePassengerList[index];
    console.log("selectedPass === ", selectedPass);
    this.passId = selectedPass.passId;
    this.passEmail = selectedPass.passEmail;

    // Wait for passData if it is undefined
    if (!this.passData) {
      try {
        const result = await this.handleData.userExists(this.passEmail, false); // Wait for userExists to resolve
        console.log("result === ", result);
        if (result.isExist) {
          console.log("this.handleData.user === ", this.handleData.user);
          this.handleData.user = result.data;
          this.passData = this.handleData.user;
          console.log("this.passData === ", this.passData);
        } else {
          console.log("User not found");
          return; // Exit if the user is not found
        }
      } catch (error) {
        console.error("Error:", error);
        return; // Exit if there's an error
      }
    }

    // Now that this.passData is guaranteed to be available, update fields
    console.log("this.passData === ", this.passData);


    // Find the matched ride and update passenger list
    const matchedRide = this.rideCreator.ride.rideList.find((ride: { id: string }) => ride.id === this.currentRideId);
    console.log("matchedRide === ", matchedRide);

    if (matchedRide) {
      const currentRidePassengerList = this.handleData.clone(matchedRide.passengerList);
      console.log("currentRidePassengerList === ", currentRidePassengerList);

      const currentUserExistInPassList = currentRidePassengerList.find((obj: { passId: any }) => obj.passId === this.passId);
      console.log("currentUserExistInPassList === ", currentUserExistInPassList);

      if (currentUserExistInPassList) {
        const updatedPassengerList = currentRidePassengerList.map((obj: { passId: any; passStatus: string }) => {

          if (obj.passId === this.passId) {
            return { ...obj, passStatus: "accepted" }; // Update status to "accepted"
          }
          return obj;
        });
        console.log("updatedPassengerList === ", updatedPassengerList);

        matchedRide.passengerList = this.handleData.clone(updatedPassengerList);
        await this.handleData.updateDocumentField(this.ride.riderUserId, 'ride', this.rideCreator.ride); // Wait for the ride update

        const notificationMessage = {
          senderName: this.currentUser.userName,
          status: 'accepted',
          message: 'accepted a Ride',
          rideid: this.currentRideId,
          url: 'profile'
        }
        if (this.passData.isNotification == true) {
          this.passData.notificationList.unshift(this.handleData.clone(notificationMessage));
        } else {
          this.passData.notificationList = [notificationMessage]
        }
        await this.handleData.updateDocumentField(this.passId, 'notificationList', this.passData.notificationList);
        await this.handleData.updateDocumentField(this.passId, 'isNotification', true); // Wait for the update to complete
      }
    }
  }


  async rejectRequest(index: any) {
    const selectedPass = this.selectedRidePassengerList[index]
    this.passName = selectedPass.passName
    console.log("index === ", index);
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
