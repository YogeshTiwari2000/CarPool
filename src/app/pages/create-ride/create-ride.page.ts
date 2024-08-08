import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonDatetimeButton, IonModal, IonDatetime, IonTabButton, IonButton, IonRadioGroup, IonRadio, IonItem, IonLabel, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { TravelFromToComponent } from 'src/app/components/travel-from-to/travel-from-to.component';

@Component({
  selector: 'app-create-ride',
  templateUrl: './create-ride.page.html',
  styleUrls: ['./create-ride.page.scss'],
  standalone: true,
  imports: [IonButtons, IonMenuButton, IonLabel, IonItem, IonRadio, IonRadioGroup, IonButton, IonTabButton, IonDatetime, IonModal, IonDatetimeButton, IonRow, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TravelFromToComponent, ReactiveFormsModule,]
})
export class CreateRidePage implements OnInit {
  time: string = '';
  from: string | undefined;
  to: string | undefined;
  date: any = '';
  seatAvl: number = 1;
  price: number = 120;
  createRideForm: FormGroup;


  rideDetails = {
    time: '',
    from: '',
    to: '',
    date: '',
    seatAvl: '',
    price: ''
  }

  constructor(private FormBuilder: FormBuilder) {
    this.createRideForm = this.FormBuilder.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      time: ['', Validators.required],
      date: ['', Validators.required],
      seatAvl: ['', Validators.required],
      price: ['', Validators.required],

    });
  }

  ngOnInit() {
    this.setDateToCurrent()
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

    this.rideDetails = {
      time: this.time,
      from: this.from ?? '',
      to: this.to ?? '',
      date: this.date,
      seatAvl: this.seatAvl.toString(),
      price: this.price.toString()
    };

    console.log('onCreateRide clicked');
    console.log('rideDetails===', this.rideDetails);

  }
}
