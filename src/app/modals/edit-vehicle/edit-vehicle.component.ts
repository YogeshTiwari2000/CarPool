import { Component, inject, Input, OnInit } from '@angular/core';
import { addIcons } from "ionicons";
import {
  IonCard, IonInput, IonRow, IonCol, IonTitle, IonSelect,
  IonSelectOption, IonButton, IonFooter, IonContent,
  ModalController
} from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { HandleDataService } from 'src/app/services/data/handle-data.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.scss'],
  standalone: true,
  imports: [IonContent, IonFooter, IonButton, IonTitle, IonCol, IonRow, IonInput, IonCard, IonSelect,
    IonSelectOption, FormsModule,]
})
export class EditVehicleComponent implements OnInit {

  @Input() data: any;
  @Input() selectedVehicle: any;

  vehicle: any = {
    vehicleDetails: {
      vehicleType: "",
      vehicleNumber: "",
      vehicleName: "",
      vehicleColor: '',
    },
    vehicleList: []
  }

  public modalCtrl = inject(ModalController);
  private handleData = inject(HandleDataService);
  private localStr = inject(LocalStorageService);

  constructor() { }

  ngOnInit() {
    this.vehicle = this.data.vehicle;
    // console.log("this.data.vehicle === ", this.data.vehicle);
    console.log("selectedVehicle === ", this.selectedVehicle);
  }

  async updateVehicle() {

    let _data = {
      ...this.data,
      vehicle: this.vehicle
    }

    const currentUserDocId = this.localStr.getItem("currentUserDocId");
    try {
      if (this.data) {
        await this.handleData.updateDocument(currentUserDocId, _data);

        // Dismiss the modal after successful update
        const modal = document.querySelector('ion-modal');
        if (modal) {
          modal.dismiss();
        }
      }
    } catch (error) {

    }
  }
}