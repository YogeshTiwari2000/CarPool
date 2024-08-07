import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonDatetimeButton, IonModal, IonDatetime, IonTabButton, IonButton, IonRadioGroup, IonRadio, IonItem, IonLabel } from '@ionic/angular/standalone';
import { TravelFromToComponent } from 'src/app/components/travel-from-to/travel-from-to.component';

@Component({
  selector: 'app-create-ride',
  templateUrl: './create-ride.page.html',
  styleUrls: ['./create-ride.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonRadio, IonRadioGroup, IonButton, IonTabButton, IonDatetime, IonModal, IonDatetimeButton, IonRow, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TravelFromToComponent, ReactiveFormsModule,]
})
export class CreateRidePage implements OnInit {
  time: string = '12:00';

  date: any = '';
  seatAvl: number = 1;
  price: number = 120;
  createRideForm: FormGroup;
  constructor(private FormBuilder: FormBuilder) {
    this.createRideForm = this.FormBuilder.group({
      time: [Validators.required],
      date: [Validators.required],
      seatAvl: [Validators.required],
      price: [Validators.required],

    });
  }

  ngOnInit() {
    this.setDateToCurrent()
  }

  setDateToCurrent() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    // this.date = `${dd}-${mm}-${yyyy}`;
    this.date = `${yyyy}-${mm}-${dd}`;
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
    console.log('onCreateRide  clicked');
    console.log("time === ", this.time);
    console.log("date === ", this.date);
    console.log("seatAvl === ", this.seatAvl);
    console.log("price === ", this.price);
  }
}
