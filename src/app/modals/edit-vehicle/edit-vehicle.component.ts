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

  // vehicle: any = {
  //   vehicleDetails: {
  //     vehicleType: "",
  //     vehicleNumber: "",
  //     vehicleName: "",
  //     vehicleColor: '',
  //   },
  //   vehicleList: []
  // }

  vehicleList: any;
  vehicleType: any = "";
  vehicleNumber: any = "";
  vehicleName: any = "";
  vehicleColor: any = '';

  public modalCtrl = inject(ModalController);
  private handleData = inject(HandleDataService);
  private localStr = inject(LocalStorageService);

  constructor() { }

  ngOnInit() {
    console.log("this.data.vehicle === ", this.data.vehicle);
    // console.log("this.data.vehicle === ", this.data.vehicle);
    console.log("selectedVehicle === ", this.selectedVehicle);

    this.vehicleType = this.selectedVehicle.vehicleType;
    this.vehicleNumber = this.selectedVehicle.vehicleNumber;
    this.vehicleName = this.selectedVehicle.vehicleName;
    this.vehicleColor = this.selectedVehicle.vehicleColor;

    this.vehicleList = this.data.vehicle.vehicleList
    console.log(" this.vehicleList === ", this.vehicleList);

  }

  async updateVehicle() {
    const vehicleToFind = this.selectedVehicle.vehicleNumber;
    const matchedVehicle = this.vehicleList.find((vehicle: { vehicleNumber: string; }) => vehicle.vehicleNumber === vehicleToFind);
    console.log("matchedVehicle === ", matchedVehicle);

    if (matchedVehicle) {
      matchedVehicle.vehicleType = this.vehicleType;
      matchedVehicle.vehicleName = this.vehicleName;
      matchedVehicle.vehicleColor = this.vehicleColor;
      const currentUserDocId = this.localStr.getItem("currentUserDocId");
      this.handleData.updateDocumentField(currentUserDocId, 'vehicle', this.data.vehicle);

      this.modalCtrl.dismiss();
    }
  }
}