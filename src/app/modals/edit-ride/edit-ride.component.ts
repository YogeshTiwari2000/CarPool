import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IonContent, IonLabel, IonItem, IonInput, IonButton, IonDatetime } from "@ionic/angular/standalone";
import { HandleDataService } from 'src/app/services/data/handle-data.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Component({
  selector: 'app-edit-ride',
  templateUrl: './edit-ride.component.html',
  styleUrls: ['./edit-ride.component.scss'],
  standalone: true,
  imports: [IonDatetime, IonButton, IonInput, IonItem, IonLabel, IonContent, FormsModule],
})
export class EditRideComponent implements OnInit {

  private handleData = inject(HandleDataService);
  localStorageService = inject(LocalStorageService);
  // commonService = inject(CommonService);

  @Input() currentRideData: any;

  email: any

  price: number | undefined;
  seatAvl: number | undefined;
  time: string | undefined;
  currentUser: any
  currentUserDocId: any;
  constructor() { }
  ngOnInit() {
    console.log('currentRideData', this.currentRideData);

  }

  ionViewWillEnter() {
    this.email = this.currentRideData.riderEmail
    this.price = this.currentRideData.price
    this.seatAvl = this.currentRideData.seatAvl
    this.time = this.currentRideData.time
    console.log(" this.emai === ", this.email);
    this.handleData
      .userExists(this.email)
      .then((result) => {
        if (result.isExist) {
          this.handleData.user = result.data;
          console.log("this.handleData.user === ", this.handleData.user);
          this.currentUserDocId = this.localStorageService.getItem("currentUserDocId");
          // console.log("this.currentUserDocId === ", this.currentUserDocId);
          this.currentUser = this.handleData.user
        } else {
          console.log("User not found");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }



  updateRide(form: NgForm) {
    if (form.valid) {
      //  console.log("currentUser === ", this.currentUser.ride.rideList);
      const userRideList = this.currentUser.ride.rideList
      const idToFind = this.currentRideData.id;
      // console.log("idToFind === ", idToFind);
      const matchedRide = userRideList.find((ride: { id: string; }) => ride.id === idToFind);
      // console.log(matchedRide); 
      console.log("this.currentUser.userEmail === ", this.currentUser.userEmail);
      console.log("this.email === ", this.email);
      if (this.currentUser.userEmail === this.email) {
        if (matchedRide) {
          matchedRide.price = this.price;
          matchedRide.seatAvl = this.seatAvl;
          matchedRide.time = this.time;
          // console.log('Updated Element:', matchedRide);
          this.handleData.updateDocumentField(this.currentUserDocId, 'ride', this.currentUser.ride)
          // console.log("this.currentUser.ride === ", this.currentUser.ride);
        } else {
          console.log('Element with id' + this.price + 'not found');
        }
      } else {
        console.log('id not matched');

      }

    }

  }



}
