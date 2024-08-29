import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonCol, IonToolbar, IonTitle, IonButton, IonIcon, IonContent, IonCard, IonRow, IonInput, ModalController, IonSelect, IonSelectOption } from "@ionic/angular/standalone";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
  standalone: true,
  imports: [IonInput, IonRow, IonCard, IonContent, IonIcon, IonButton, IonTitle, IonToolbar, IonCol, IonHeader, IonSelect, IonSelectOption],
})
export class VehicleComponent implements OnInit {

  public modalCtrl = inject(ModalController);

  vehicleDetails: any = {
    vehicleType: "",
    vehicleNumber: "",
    vehicleName: "",
    vehicleColor: '',
  };

  constructor() { }

  ngOnInit() {
    console.log();

  }
  close() {
    this.modalCtrl.dismiss();
  }


}
