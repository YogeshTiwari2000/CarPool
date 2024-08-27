import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IonContent, IonLabel, IonItem, IonInput, IonButton, IonDatetime } from "@ionic/angular/standalone";
import { HandleDataService } from 'src/app/services/data/handle-data.service';

@Component({
  selector: 'app-edit-ride',
  templateUrl: './edit-ride.component.html',
  styleUrls: ['./edit-ride.component.scss'],
  standalone: true,
  imports: [IonDatetime, IonButton, IonInput, IonItem, IonLabel, IonContent, FormsModule],
})
export class EditRideComponent implements OnInit {

  private handleData = inject(HandleDataService);
  // localStorageService = inject(LocalStorageService);
  // commonService = inject(CommonService);

  @Input() currentRideData: any;

  email: any

  price: number | undefined;
  seatAvl: number | undefined;
  time: string | undefined;
  currentUser: any
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
          this.currentUser = this.handleData.user
        } else {
          console.log("User not found");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });


  }



  onSubmit(form: NgForm) {
    if (form.valid) {

      console.log("currentUser === ", this.currentUser.ride.rideList);

      console.log("Form Submitted!");
      console.log("Price: ", this.price);
      console.log("Seat Availability: ", this.seatAvl);
      console.log("Time: ", this.time);

    }

  }



}
