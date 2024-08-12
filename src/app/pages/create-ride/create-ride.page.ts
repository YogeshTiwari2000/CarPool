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

  time: string = '';
  from: string | undefined;
  to: string | undefined;
  date: any = '';
  seatAvl: number = 1;
  price: number = 120;
  returnTime: string = '';
  returnFrom: string | undefined;
  returnTo: string | undefined;
  returnDate: any = '';
  returnSeatAvl: number = 2;
  returnPrice: number = 100;


  createRideForm: FormGroup;
  minDate: string = '';


  returnride: boolean = false;
  rideDetails = {
    time: '',
    from: '',
    to: '',
    date: '',
    seatAvl: '',
    price: '',
  }
  returnRideDetails = {
    returnTime: '',
    returnFrom: '',
    returnTo: '',
    returnDate: '',
    returnSeatAvl: '',
    returnPrice: ''
  }



  constructor(private FormBuilder: FormBuilder) {
    this.createRideForm = this.FormBuilder.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      time: ['', Validators.required],
      date: ['', Validators.required],
      seatAvl: ['', Validators.required],
      price: ['', Validators.required],
      returnTime: [''],
      returnFrom: [''],
      returnTo: [''],
      returnDate: [''],
      returnSeatAvl: [''],
      returnPrice: ['']

    }, {
      validator: this.validateReturnTime('date', 'time', 'returnDate', 'returnTime')
    });
  }

  ngOnInit() {
    this.setDateToCurrent();
    this.setMinDate();



    this.handleData
      .userExists(this.email)
      .then((result) => {
        if (result.isExist) {
          this.handleData.user = result.data;
          console.log("User data:", result.data);
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
  onReturnLocationsChanged(event: { from: string, to: string }) {
    this.returnFrom = event.from;
    this.returnTo = event.to;
    this.createRideForm.patchValue({
      returnFrom: this.returnFrom,
      returnTo: this.returnTo
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

  validateReturnTime(dateKey: string, timeKey: string, returnDateKey: string, returnTimeKey: string) {
    return (formGroup: FormGroup) => {
      const dateControl = formGroup.controls[dateKey];
      const timeControl = formGroup.controls[timeKey];
      const returnDateControl = formGroup.controls[returnDateKey];
      const returnTimeControl = formGroup.controls[returnTimeKey];

      if (!returnDateControl || !returnTimeControl) {
        return null;
      }

      const today = new Date();
      const currentTime = `${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}`;

      if (returnDateControl.value === dateControl.value && returnTimeControl.value <= currentTime) {
        returnTimeControl.setErrors({ returnTimeInvalid: true });
      } else {
        returnTimeControl.setErrors(null);
      }

      return null;  // Ensure a return value from the function
    };
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
  incReturnSeatAvl() {
    if (this.returnSeatAvl < 7) {
      this.returnSeatAvl++
    }
  }

  decReturnSeatAvl() {
    if (this.returnSeatAvl > 1) {
      this.returnSeatAvl--
    }
  }

  toggleReturnRide() {
    this.returnride = !this.returnride;
  }



  onCreateRide() {
    const currentUser = this.handleData.user;
    console.log("currentUser === ", currentUser);
    const currentUserDocId = this.localStorageService.getItem("currentUserDocId");



    this.returnRideDetails = {
      returnTime: this.returnTime,
      returnFrom: this.returnFrom ?? '',
      returnTo: this.returnTo ?? '',
      returnDate: this.returnDate,
      returnSeatAvl: this.returnSeatAvl.toString(),
      returnPrice: this.returnPrice.toString()

    };


    if (currentUser) {

      if (this.returnride === true) {
        this.rideDetails = {
          time: this.time,
          from: this.from ?? '',
          to: this.to ?? '',
          date: this.date,
          seatAvl: this.seatAvl.toString(),
          price: this.price.toString(),
          ...this.returnRideDetails
        }
        console.log('rideDetails===', this.rideDetails);


        this.handleData.updateDocumentField(currentUserDocId, 'ride', this.rideDetails)
        console.log("this.handleData.user === ", this.handleData.user);


      }
      else {
        this.rideDetails = {
          time: this.time,
          from: this.from ?? '',
          to: this.to ?? '',
          date: this.date,
          seatAvl: this.seatAvl.toString(),
          price: this.price.toString(),
        }
        console.log('rideDetails===', this.rideDetails);
        this.handleData.updateDocumentField(currentUserDocId, 'ride', this.rideDetails)
        console.log("this.handleData.user === ", this.handleData.user);




      }








    }


  }


}
