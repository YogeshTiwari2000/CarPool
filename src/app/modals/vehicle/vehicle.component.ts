// import { Component, inject, OnInit } from '@angular/core';
// import { IonHeader, IonCol, IonToolbar, IonTitle, IonButton, IonIcon, IonContent, IonCard, IonRow, IonInput, ModalController, IonSelect, IonSelectOption } from "@ionic/angular/standalone";
// import { FormsModule } from '@angular/forms';  // Import FormsModule

// @Component({
//   selector: 'app-vehicle',
//   templateUrl: './vehicle.component.html',
//   styleUrls: ['./vehicle.component.scss'],
//   standalone: true,
//   imports: [IonInput, IonRow, IonCard, IonContent, IonIcon, IonButton, IonTitle, IonToolbar, IonCol, IonHeader, IonSelect, IonSelectOption, FormsModule],
// })
// export class VehicleComponent implements OnInit {

//   public modalCtrl = inject(ModalController);

//   vehicleDetails: any = {
//     vehicleType: "",
//     vehicleNumber: "",
//     vehicleName: "",
//     vehicleColor: '',
//   };

//   constructor() { }

//   ngOnInit() {
//     console.log();

//   }
//   close() {
//     this.modalCtrl.dismiss();
//   }

//   submit() {
//     if (this.vehicleDetails.vehicleType && this.vehicleDetails.vehicleNumber && this.vehicleDetails.vehicleName && this.vehicleDetails.vehicleColor) {
//       console.log(this.vehicleDetails);

//       this.modalCtrl.dismiss(this.vehicleDetails); // Passing data back to the parent
//     } else {
//       console.log("Error Occured");
//     }

//   }
// }