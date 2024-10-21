declare var google: any;
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
  imports: [IonList, IonModal, IonTabButton, IonButtons, IonIcon, IonItem, IonLabel, IonButton, IonRow, IonCol, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton],
  providers: [DatePipe]
})
export class RideDetailViewPage implements OnInit {
  [x: string]: any;

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
  passengerData: any
  showpassengerList: boolean = false;
  showEditBtn: boolean = false;
  matchedRideToDisplay: any
  constructor(private route: ActivatedRoute, private datePipe: DatePipe) { }

  subscription: Subscription | undefined;
  users: any[] = [];


  ngOnInit() {

    console.log("navigator.geolocation === ", navigator.geolocation);
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

    this.waitForCurrentUserDocId()
  }
  async waitForCurrentUserDocId() {
    while (this.currentUserDocId === undefined) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    this.checkshowpassengerList()
    this.disableEditBtn()
    this.findMatchedRideToDisplay()
  }
  checkshowpassengerList() {
    if (this.currentUserDocId === this.ride.riderUserId) {
      this.showpassengerList = true
    }
  }
  disableEditBtn() {
    if (this.currentUserDocId === this.ride.riderUserId) {
      // Check if any passenger has passStatus set to "accepted"
      const passengerList = this.ride.passengerList
      const hasAcceptedPassenger = passengerList.some((passenger: { passStatus: string; }) => passenger.passStatus === 'accepted');

      if (hasAcceptedPassenger) {
        this.showEditBtn = true;
      } else {
        this.showEditBtn = false;
      }
    } else {
      this.showEditBtn = false;
    }
  }

  findMatchedRideToDisplay() {
    const displayMatchedRide = this.currentUser.ride.rideList.find((ride: { id: string; }) => ride.id === this.currentRideId);
    // console.log("displayMatchedRide === ", displayMatchedRide)
    if (displayMatchedRide != undefined) {
      this.matchedRideToDisplay = displayMatchedRide
    }
    else {
      this.matchedRideToDisplay = this.ride
    }
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
        const privousPassengerList = matchedRide.passengerList
        const privousStatus = matchedRide.status
        matchedRide.status = 'Requested'
        matchedRide.passengerList = []
        this.currentUser.ride.rideList.unshift(this.handleData.clone(matchedRide));
        this.handleData.updateDocumentField(this.currentUserDocId, 'ride', this.currentUser.ride)
        matchedRide.status = privousStatus
        matchedRide.passengerList = privousPassengerList
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
          url: 'ride-detail-view',
          Ridedata: this.ride
        }

        if (currentUserExistInPassList != undefined) {
          // this.rideCreator.notificationList.unshift(this.handleData.clone(notificationMessage));
          if (this.rideCreator.isNotification == true) {
            this.rideCreator.notificationList.unshift(this.handleData.clone(notificationMessage));
          } else {
            this.rideCreator.notificationList = [notificationMessage]
          }
          this.handleData.updateDocumentField(this.ride.riderUserId, 'notificationList', this.rideCreator.notificationList);
          this.rideCreator.allNotification.unshift(this.handleData.clone(notificationMessage));
          this.handleData.updateDocumentField(this.ride.riderUserId, 'allNotification', this.rideCreator.allNotification);
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

          const matchedRideInPassangerRidelist = this.currentUser.ride.rideList.find((ride: { id: string; }) => ride.id === this.currentRideId);
          matchedRideInPassangerRidelist.status = 'Requested'
          this.handleData.updateDocumentField(this.currentUserDocId, 'ride', this.currentUser.ride);
          // Find the index of the ride to replace 
          // this.handleData.updateDocumentField(this.ride.riderUserId, 'ride', this.rideCreator.ride); 
          if (rideIndex !== -1) {

            if (this.rideCreator.isNotification == true) {
              this.rideCreator.notificationList.unshift(this.handleData.clone(notificationMessage));
            } else {
              this.rideCreator.notificationList = [notificationMessage]
            }
            this.rideCreator.allNotification.unshift(this.handleData.clone(notificationMessage));
            this.handleData.updateDocumentField(this.ride.riderUserId, 'allNotification', this.rideCreator.allNotification);
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


  async cancelByDriver() {
    const matchedRide = this.rideCreator.ride.rideList.find((ride: { id: string; }) => ride.id === this.currentRideId);
    console.log("matchedRide cancelByDriver wali === ", matchedRide);

    if (matchedRide != undefined) {
      matchedRide.status = 'RideCancelledByDriver';
      await this.handleData.updateDocumentField(this.ride.riderUserId, 'ride', this.rideCreator.ride);
      const requestedPassengerList = matchedRide.passengerList;
      console.log("requestedPassengerList === ", requestedPassengerList);

      for (let index = 0; index < requestedPassengerList.length; index++) {
        const passengerDocId = requestedPassengerList[index].passId;
        const passengerEmail = requestedPassengerList[index].passEmail;
        const previousPassengerData = this.passengerData;

        try {
          const result = await this.handleData.userExists(passengerEmail, false);
          if (result.isExist) {
            this.handleData.user = result.data;
            this.passengerData = this.handleData.user;
            console.log("passengerData === " + index, this.passengerData);
            if (this.passengerData != undefined) {
              const passengerMatchedRide = this.passengerData.ride.rideList.find((ride: { id: string; }) => ride.id === this.currentRideId);
              console.log("passengerMatchedRide cancelByDriver wali === ", passengerMatchedRide);

              if (passengerMatchedRide != undefined) {
                passengerMatchedRide.status = 'RideCancelledByDriver';
                await this.handleData.updateDocumentField(passengerDocId, 'ride', this.passengerData.ride);

                const notificationMessage = {
                  senderName: this.currentUser.userName,
                  status: 'cancelled',
                  message: 'cancelled a Ride',
                  rideid: this.currentRideId,
                  url: 'ride-detail-view',
                  Ridedata: this.ride
                }
                if (this.passengerData.isNotification == true) {
                  this.passengerData.notificationList.unshift(this.handleData.clone(notificationMessage));
                } else {
                  this.passengerData.notificationList = [notificationMessage]
                }
                this.passengerData.allNotification.unshift(this.handleData.clone(notificationMessage));
                this.handleData.updateDocumentField(passengerDocId, 'allNotification', this.passengerData.allNotification);
                this.handleData.updateDocumentField(passengerDocId, 'notificationList', this.passengerData.notificationList);
                this.handleData.updateDocumentField(passengerDocId, 'isNotification', true);
              }
            }
          } else {
            console.log("User not found");
          }
        } catch (error) {
          console.error("Error:", error);
        }
        // Reset passengerData after each iteration
        this.passengerData = previousPassengerData;
      }
    }
  }

  async cancelRide() {
    const matchedRide = this.rideCreator.ride.rideList.find((ride: { id: string; }) => ride.id === this.currentRideId);
    console.log("matchedRide cancel wali === ", matchedRide);
    const matchedRideInCurrentUserList = this.currentUser.ride.rideList.find((ride: { id: string; }) => ride.id === this.currentRideId);
    console.log("matchedRideInCurrentUserList === ", matchedRideInCurrentUserList);

    // Update the status of the current user's ride if it exists
    if (matchedRideInCurrentUserList != undefined) {
      matchedRideInCurrentUserList.status = 'cancelled';
      this.handleData.updateDocumentField(this.currentUserDocId, 'ride', this.currentUser.ride);
    }

    const notificationMessage = {
      senderName: this.currentUser.userName,
      status: 'cancelled',
      message: 'cancelled a Ride',
      rideid: this.currentRideId,
      url: 'ride-detail-view',
      Ridedata: this.ride
    };

    if (matchedRide) {
      const currentRidePassangerList = this.handleData.clone(matchedRide.passengerList);
      console.log("matchRidePassList cancel wali === ", currentRidePassangerList);
      const currentUserExistInPassList = currentRidePassangerList.find((obj: { passId: any; }) => obj.passId === this.currentUserDocId);
      console.log("currentUserExistInPassList cancel wali === ", currentUserExistInPassList);

      // If the user exists in the passenger list, remove them from the list
      if (currentUserExistInPassList) {
        const updatedPassengerList = currentRidePassangerList.filter((obj: { passId: any; }) => obj.passId !== this.currentUserDocId);
        // const updatedPassengerList = currentRidePassangerList.map((obj: { passId: any; passStatus: string; }) => {
        //         if (obj.passId === this.currentUserDocId) {
        //           return { ...obj, passStatus: "cancelled" };
        //         }
        //         return obj;
        //       });

        // Handle notifications
        if (this.rideCreator.isNotification == true) {
          this.rideCreator.notificationList.unshift(this.handleData.clone(notificationMessage));
        } else {
          this.rideCreator.notificationList = [notificationMessage];
        }
        this.rideCreator.allNotification.unshift(this.handleData.clone(notificationMessage));
        this.handleData.updateDocumentField(this.ride.riderUserId, 'allNotification', this.rideCreator.allNotification);
        // Update fields in the database
        this.handleData.updateDocumentField(this.ride.riderUserId, 'notificationList', this.rideCreator.notificationList);
        matchedRide.passengerList = this.handleData.clone(updatedPassengerList);
        this.handleData.updateDocumentField(this.ride.riderUserId, 'ride', this.rideCreator.ride);
        this.handleData.updateDocumentField(this.ride.riderUserId, 'isNotification', true);
      }
    }

    // Dismiss the modal after the operation is complete
    this.modalCtrl.dismiss();
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


  async acceptRejectRequest(index: any, btn: any) {
    const selectedPass = this.selectedRidePassengerList[index];
    console.log("selectedPass === ", selectedPass);
    this.passId = selectedPass.passId;
    this.passEmail = selectedPass.passEmail;

    const buttonType = btn[0]
    console.log("buttonType === ", buttonType);
    // Wait for passData if it is undefined
    if (!this.passData) {
      try {
        const result = await this.handleData.userExists(this.passEmail, false); // Wait for userExists to resolve
        console.log("result=== ", result);
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
            if (buttonType == 'accept') {
              const matchedRideOfPerticularPassenger = this.passData.ride.rideList.find((ride: { id: string }) => ride.id === this.currentRideId);
              console.log("matchedRideOfPerticularPassenger privous=== ", matchedRideOfPerticularPassenger);
              matchedRideOfPerticularPassenger.status = 'accepted'
              console.log("matchedRideOfPerticularPassenger === ", matchedRideOfPerticularPassenger);
              this.handleData.updateDocumentField(this.passId, 'ride', this.passData.ride);
              return { ...obj, passStatus: "accepted" }; // Update status to "accepted"
            }
            else if (buttonType == 'reject') {
              const matchedRideOfPerticularPassenger = this.passData.ride.rideList.find((ride: { id: string }) => ride.id === this.currentRideId);
              console.log("matchedRideOfPerticularPassenger privous=== ", matchedRideOfPerticularPassenger);
              matchedRideOfPerticularPassenger.status = 'rejected'
              console.log("matchedRideOfPerticularPassenger === ", matchedRideOfPerticularPassenger);
              this.handleData.updateDocumentField(this.passId, 'ride', this.passData.ride);
              return { ...obj, passStatus: "rejected" }; // Update status to "reject"
            }
          }

          return obj;
        });
        console.log("updatedPassengerList === ", updatedPassengerList);

        matchedRide.passengerList = this.handleData.clone(updatedPassengerList);
        await this.handleData.updateDocumentField(this.ride.riderUserId, 'ride', this.rideCreator.ride); // Wait for the ride update

        if (buttonType == 'accept') {
          const notificationMessage = {
            senderName: this.currentUser.userName,
            status: 'accepted',
            message: 'accepted a Ride',
            rideid: this.currentRideId,
            url: 'ride-detail-view',
            Ridedata: this.ride
          }

          if (this.passData.isNotification == true) {
            this.passData.notificationList.unshift(this.handleData.clone(notificationMessage));
          } else {
            this.passData.notificationList = [notificationMessage]
          }
          this.passData.allNotification.unshift(this.handleData.clone(notificationMessage));
          this.handleData.updateDocumentField(this.passId, 'allNotification', this.passData.allNotification);
        }
        else if (buttonType == 'reject') {
          const notificationMessage = {
            senderName: this.currentUser.userName,
            status: 'rejected',
            message: 'rejected a Ride',
            rideid: this.currentRideId,
            url: 'ride-detail-view',
            Ridedata: this.ride
          }
          if (this.passData.isNotification == true) {
            this.passData.notificationList.unshift(this.handleData.clone(notificationMessage));
          } else {
            this.passData.notificationList = [notificationMessage]
          }
          this.passData.allNotification.unshift(this.handleData.clone(notificationMessage));
          this.handleData.updateDocumentField(this.passId, 'allNotification', this.passData.allNotification);
        }
        await this.handleData.updateDocumentField(this.passId, 'notificationList', this.passData.notificationList);
        await this.handleData.updateDocumentField(this.passId, 'isNotification', true); // Wait for the update to complete
      }
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

  async startStopRideByDriverNotification(btn: any) {
    const matchedRide = this.rideCreator.ride.rideList.find((ride: { id: string; }) => ride.id === this.currentRideId);
    console.log("matchedRide started  === ", matchedRide);
    const buttonType = btn[0]
    console.log("buttonType === ", buttonType);
    if (matchedRide != undefined) {

      const now = new Date();

      const currentTime = this.datePipe.transform(now, 'HH:mm:ss') ?? '';
      const currentDate = this.datePipe.transform(now, 'yyyy-MM-dd') ?? '';

      if (buttonType === 'start') {

        matchedRide.status = 'RideStarted';
        matchedRide.travelDetails.startlocation = matchedRide.from;
        matchedRide.travelDetails.startTime = currentTime;
        matchedRide.travelDetails.startDate = currentDate;
        console.log("matchedRide123 === ", matchedRide);
      } else {
        matchedRide.status = 'RideStoped';
        matchedRide.travelDetails.endTime = currentTime;
        console.log("matchedRide123 === ", matchedRide);
      }
      await this.handleData.updateDocumentField(this.ride.riderUserId, 'ride', this.rideCreator.ride);
      const requestedPassengerList = matchedRide.passengerList;
      console.log("requestedPassengerList === ", requestedPassengerList);

      for (let index = 0; index < requestedPassengerList.length; index++) {
        const passengerDocId = requestedPassengerList[index].passId;
        const passengerEmail = requestedPassengerList[index].passEmail;
        const previousPassengerData = this.passengerData;

        if (buttonType === 'start') {
          requestedPassengerList[index].passStatus = 'RideStarted'
        }
        else {
          requestedPassengerList[index].passStatus = 'RideStoped'
        }
        this.handleData.updateDocumentField(this.ride.riderUserId, 'ride', this.rideCreator.ride);

        try {
          const result = await this.handleData.userExists(passengerEmail, false);
          if (result.isExist) {
            this.handleData.user = result.data;
            this.passengerData = this.handleData.user;
            console.log("passengerData === " + index, this.passengerData);
            if (this.passengerData != undefined) {
              const passengerMatchedRide = this.passengerData.ride.rideList.find((ride: { id: string; }) => ride.id === this.currentRideId);
              console.log("passengerMatchedRide cancelByDriver wali === ", passengerMatchedRide);

              if (passengerMatchedRide != undefined) {
                if (buttonType === 'start') {
                  passengerMatchedRide.status = 'RideStarted';
                }
                else {
                  passengerMatchedRide.status = 'RideStoped';
                }
                await this.handleData.updateDocumentField(passengerDocId, 'ride', this.passengerData.ride);
                if (buttonType === 'start') {
                  const notificationMessage = {
                    senderName: this.currentUser.userName,
                    status: 'Ride has Started',
                    message: 'Ride has begun so, sit back and relax, enjoy your ride',
                    rideid: this.currentRideId,
                    url: 'ride-detail-view',
                    Ridedata: this.ride
                  }
                  if (this.passengerData.isNotification == true) {
                    this.passengerData.notificationList.unshift(this.handleData.clone(notificationMessage));
                  } else {
                    this.passengerData.notificationList = [notificationMessage]
                  }
                  this.passengerData.allNotification.unshift(this.handleData.clone(notificationMessage));
                } else {
                  const notificationMessage = {
                    senderName: this.currentUser.userName,
                    status: 'Ride has Stoped',
                    message: 'Ride is completed',
                    rideid: this.currentRideId,
                    url: 'ride-detail-view',
                    Ridedata: this.ride
                  }
                  if (this.passengerData.isNotification == true) {
                    this.passengerData.notificationList.unshift(this.handleData.clone(notificationMessage));
                  } else {
                    this.passengerData.notificationList = [notificationMessage]
                  }
                  this.passengerData.allNotification.unshift(this.handleData.clone(notificationMessage));
                }

                this.handleData.updateDocumentField(passengerDocId, 'allNotification', this.passengerData.allNotification);
                this.handleData.updateDocumentField(passengerDocId, 'notificationList', this.passengerData.notificationList);
                this.handleData.updateDocumentField(passengerDocId, 'isNotification', true);
              }
            }
          } else {
            console.log("User not found");
          }
        } catch (error) {
          console.error("Error:", error);
        }
        // Reset passengerData after each iteration
        this.passengerData = previousPassengerData;
      }
    }
  }

  async startStopByPassNotification(btn: any) {
    const matchedRide = this.rideCreator.ride.rideList.find((ride: { id: string; }) => ride.id === this.currentRideId);
    const matchedRideInCurrentUserList = this.currentUser.ride.rideList.find((ride: { id: string; }) => ride.id === this.currentRideId);

    const passButtonType = btn[0];
    console.log("matchedRide is === ", matchedRide);

    // Update the status of the current user's ride if it exists
    if (matchedRideInCurrentUserList != undefined) {
      if (passButtonType === 'start') {
        matchedRideInCurrentUserList.status = 'RideStarted';
      } else {
        matchedRideInCurrentUserList.status = 'RideStopped';
      }

      this.handleData.updateDocumentField(this.currentUserDocId, 'ride', this.currentUser.ride);
    }

    let notificationMessage;
    if (passButtonType === 'start') {
      notificationMessage = {
        senderName: this.currentUser.userName,
        status: 'RideStarted',
        message: 'Ride has Started',
        rideid: this.currentRideId,
        url: 'ride-detail-view',
        Ridedata: this.ride
      };
    } else {
      notificationMessage = {
        senderName: this.currentUser.userName,
        status: 'RideStopped',
        message: 'Ride is completed',
        rideid: this.currentRideId,
        url: 'ride-detail-view',
        Ridedata: this.ride
      };
    }

    if (matchedRide) {
      const currentRidePassengerList = this.handleData.clone(matchedRide.passengerList);
      const currentUserExistInPassengerList = currentRidePassengerList.find((obj: { passId: any; }) => obj.passId === this.currentUserDocId);

      // If the user exists in the passenger list, remove them from the list
      if (currentUserExistInPassengerList) {
        if (this.rideCreator.isNotification === true) {
          this.rideCreator.notificationList.unshift(this.handleData.clone(notificationMessage));
        } else {
          this.rideCreator.notificationList = [notificationMessage];
        }

        this.rideCreator.allNotification.unshift(this.handleData.clone(notificationMessage));

        this.handleData.updateDocumentField(this.ride.riderUserId, 'allNotification', this.rideCreator.allNotification);
        this.handleData.updateDocumentField(this.ride.riderUserId, 'notificationList', this.rideCreator.notificationList);
        this.handleData.updateDocumentField(this.ride.riderUserId, 'ride', this.rideCreator.ride);
        this.handleData.updateDocumentField(this.ride.riderUserId, 'isNotification', true);
      }
    }

    this.modalCtrl.dismiss();
  }


  // getCurrentLocation() {
  //   console.log("getCurrentLocation === ",);
  //   console.log("navigator.geolocation.getCurrentPosition === ", navigator.geolocation.getCurrentPosition);
  //   navigator.geolocation.getCurrentPosition
  //   // if (navigator.geolocation) {
  //   //   // Get current location when the button is clicked
  //   //   navigator.geolocation.getCurrentPosition(
  //   //     (position) => {
  //   //       const latitude = position.coords.latitude;
  //   //       const longitude = position.coords.longitude;
  //   //       console.log("Current position: ", latitude, longitude);

  //   //       // Use Google Maps Geocoder to get the address from the latitude and longitude
  //   //       const geocoder = new google.maps.Geocoder();
  //   //       const latlng = { lat: latitude, lng: longitude };

  //   //       geocoder.geocode({ location: latlng }, (results: { formatted_address: any; }[], status: string) => {
  //   //         if (status === "OK") {
  //   //           if (results && results[0]) {
  //   //             const from = results[0].formatted_address;
  //   //             console.log("Formatted Address (Current Location): ", from);
  //   //           } else {
  //   //             console.log("No results found");
  //   //           }
  //   //         } else {
  //   //           console.log("Geocoder failed due to: " + status);
  //   //         }
  //   //       });
  //   //     },
  //   //     (error) => {
  //   //       // Handle geolocation errors
  //   //       switch (error.code) {
  //   //         case error.PERMISSION_DENIED:
  //   //           console.log("User denied the request for Geolocation.");
  //   //           break;
  //   //         case error.POSITION_UNAVAILABLE:
  //   //           console.log("Location information is unavailable.");
  //   //           break;
  //   //         case error.TIMEOUT:
  //   //           console.log("The request to get user location timed out.");
  //   //           break;
  //   //         // case error.UNKNOWN_ERROR:
  //   //         //   console.log("An unknown error occurred.");
  //   //         //   break;
  //   //       }
  //   //     },
  //   //     {
  //   //       // Optional: Configure options for geolocation
  //   //       enableHighAccuracy: true,
  //   //       timeout: 10000,  // 10 seconds timeout
  //   //       maximumAge: 0,  // Do not cache location
  //   //     }
  //   //   );
  //   // } else {
  //   //   console.log("Geolocation is not supported by this browser.");
  //   // }
  // }

  // getCurrentLoc() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         console.log("Location retrieved successfully");
  //       },
  //       (error) => {
  //         console.error("Error retrieving location", error);
  //       }
  //     )
  //   } else {
  //     alert('Geo not supported')
  //   }
  // }

}
