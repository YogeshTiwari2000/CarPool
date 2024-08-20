import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonDatetimeButton, IonModal, IonDatetime, IonTabButton, IonButton, IonRadioGroup, IonRadio, IonItem, IonLabel, IonButtons, IonMenuButton, IonToggle, IonCol } from '@ionic/angular/standalone';
import { TravelFromToComponent } from 'src/app/components/travel-from-to/travel-from-to.component';
import { HandleDataService } from 'src/app/services/data/handle-data.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-create-ride',
  templateUrl: './create-ride.page.html',
  styleUrls: ['./create-ride.page.scss'],
  standalone: true,
  imports: [IonCol, IonToggle, IonButtons, IonMenuButton, IonLabel, IonItem, IonRadio, IonRadioGroup, IonButton, IonTabButton, IonDatetime, IonModal, IonDatetimeButton, IonRow, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TravelFromToComponent, ReactiveFormsModule,]
})
export class CreateRidePage implements OnInit {

  private handleData = inject(HandleDataService);
  localStorageService = inject(LocalStorageService);
  commonService = inject(CommonService);

  email: any = this.commonService.currentUserEmail;
  users: any[] = [];
  currentUser: any;
  currentUserDocId: any;
  rideCreatedBy: any = 'driver';

  time: string = '';
  from: string | undefined;
  to: string | undefined;
  date: any = '';
  seatAvl: number = 1;
  price: number = 0;
  companionNames: any = ''


  createRideForm: FormGroup;
  minDate: string = '';


  ride = {
    lastride: {
      id: '',
      ridername: '',
      riderpicture: '',
      time: '',
      type: '',
      from: '',
      to: '',
      date: '',
      seatAvl: '',
      price: '',
      companionNames: '',
    },
    rideList: [],
  }



  constructor(private FormBuilder: FormBuilder) {
    this.createRideForm = this.FormBuilder.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      time: ['', Validators.required],
      date: ['', Validators.required],
      seatAvl: ['', Validators.required],
      price: ['', Validators.required],
      rideType: ['driver'],
      companionNames: ['']

    },)
  }

  ngOnInit() {
    console.log();
    // Listen to rideType changes
    this.createRideForm.get('rideType')!.valueChanges.subscribe(value => {
      console.log('Is Driver:', value === 'driver');
      this.rideCreatedBy = value
      console.log("this.rideCreatedBy === ", this.rideCreatedBy);
      console.log('Is Companion:', value === 'companion');
    });
  }

  ionViewWillEnter() {
    this.setDateToCurrent();
    this.setMinDate();

    this.handleData
      .userExists(this.email)
      .then((result) => {
        if (result.isExist) {
          this.handleData.user = result.data;
          this.currentUser = this.handleData.user;
          console.log("currentUser === ", this.currentUser);
          this.currentUserDocId = this.localStorageService.getItem("currentUserDocId");
          console.log("this.currentUser.ride.lastride.id === ", this.currentUser.ride.lastride);
          if (this.currentUser.ride.lastride != undefined) {
            console.log('ride me id h');

          }
          else {
            console.log('ride me id crate krni h');
            this.handleData.updateDocumentField(this.currentUserDocId, 'ride', this.ride)


          }

        } else {
          console.log("User not found");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });


  }

  onLocationsChanged(event: { from: string, to: string }) {
    this.from = event.from;
    this.to = event.to;
    this.createRideForm.patchValue({
      from: this.from,
      to: this.to
    });
    console.log('Locations changed:', this.from, this.to);
  }


  setMinDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    this.minDate = `${yyyy}-${mm}-${dd}`;
  }

  setDateToCurrent() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    // this.date = `${dd}-${mm}-${yyyy}`;
    this.date = `${yyyy}-${mm}-${dd}`;
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    this.time = `${hours}:${minutes}`;
  }



  incseatAvl() {
    if (this.seatAvl < 7) {
      this.seatAvl++
    }
  }

  decseatAvl() {
    if (this.seatAvl > 1) {
      this.seatAvl--
    }
  }





  onCreateRide() {
    if (this.currentUser) {


      this.currentUser.ride.lastride.id = (Math.floor(Math.random() * 900000) + 100000).toString();
      this.currentUser.ride.lastride.ridername = this.currentUser.userName
      this.currentUser.ride.lastride.riderpicture = this.currentUser.profilePicture
      this.currentUser.ride.lastride.type = this.rideCreatedBy
      this.currentUser.ride.lastride.time = this.time
      this.currentUser.ride.lastride.from = this.from ?? ''
      this.currentUser.ride.lastride.to = this.to ?? ''
      this.currentUser.ride.lastride.date = this.date
      this.currentUser.ride.lastride.seatAvl = this.seatAvl.toString()
      this.currentUser.ride.lastride.price = this.price.toString()
      this.currentUser.ride.lastride.companionNames = this.companionNames

      if (this.rideCreatedBy === 'driver') {

        this.currentUser.ride.lastride.companionNames = 'this is driver ride'

        const immutableride = Object.freeze({ ...this.currentUser.ride.lastride });
        this.currentUser.ride.rideList.unshift(immutableride);
        this.handleData.updateDocumentField(this.currentUserDocId, 'ride', this.currentUser.ride)
      } else {
        this.currentUser.ride.lastride.price = '00'
        const immutableride = Object.freeze({ ...this.currentUser.ride.lastride });
        this.currentUser.ride.rideList.unshift(immutableride);
        this.handleData.updateDocumentField(this.currentUserDocId, 'ride', this.currentUser.ride)
      }


    }
  }
}
