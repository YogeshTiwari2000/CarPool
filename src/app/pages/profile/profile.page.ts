import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonButtons,
  IonMenuButton,
  IonBackButton,
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonLabel,
  ModalController,
  IonAvatar,
  IonCardSubtitle, IonRow, IonCol, IonButton
} from "@ionic/angular/standalone";
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from "@angular/router";
import { EditCardComponent } from "src/app/modals/edit-card/edit-card.component";
import { CommonService } from "src/app/shared/common.service";
import { LocalStorageService } from "src/app/shared/local-storage.service";
import { HandleDataService } from "src/app/services/data/handle-data.service";
// import { VehicleComponent } from "src/app/modals/vehicle/vehicle.component";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
  standalone: true,
  imports: [IonButton, IonCol, IonRow,
    IonCardSubtitle,
    IonAvatar,
    IonLabel,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonItem,
    IonBackButton,
    IonButtons,
    IonIcon,
    IonMenuButton,
    IonTabButton,
    IonTabBar,
    IonTabs,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
})
export class ProfilePage implements OnInit {
  // constructor(private routes: Router) { }
  public router = inject(Router);
  public modalCtrl = inject(ModalController);

  currentUser: any = "";
  isEmailVerified: boolean = false;
  isPhoneVerified: boolean = false;
  isGovtIdVerified: boolean = false;
  addVehicleClicked: boolean = false;
  currentUserData: any;
  userData: any;
  vehicle: any = [];

  constructor(private commonService: CommonService, public localStr: LocalStorageService, private handleData: HandleDataService) { }

  ngOnInit() {
    const currentUserEmail = this.commonService.currentUserEmail;
    // Retrieve data from Firebase and store it in local storage
    this.handleData.userExists(currentUserEmail).then((res) => {

      this.currentUserData = res.data;
      console.log("current user data", this.currentUserData);
      this.currentUser = res.data

      // this.vehicle = this.currentUser.vehicleDetails
      this.vehicle = this.currentUserData.vehicle.vehicleList || [];
      console.log(" this.vehicle === ", this.vehicle);

    })

    const data: any = localStorage.getItem("currentUser");
    const parsedData: any = JSON.parse(data);
    console.log("data === ", parsedData);

    const keys = Object.keys(parsedData);
    // console.log("keys === ", keys);
    // const firstKey = keys[0];
    // const firstKey = keys[1];
    this.currentUser = parsedData;
    // console.log('about page', this.currentUser);

    this.isEmailVerified = this.currentUser.email_verified ? true : false;
    this.isPhoneVerified = this.currentUser.phone_verified ? true : false;
    this.isGovtIdVerified = this.currentUser.govtId_verified ? true : false;
  }

  // async openEditCard(isVehicle: boolean = false) {

  //   // console.log("his.addVehicleClicked ", this.addVehicleClicked = true)
  //   const modal = await this.modalCtrl.create({
  //     component: EditCardComponent,
  //     componentProps: { data: this.currentUser, addVehicleClicked: isVehicle, vehicleIndex: index },
  //   });

  //   modal.onDidDismiss().then((dataFromModal) => {
  //     if (dataFromModal !== null) {
  //       console.log("The result:", dataFromModal.data);
  //     }
  //   });

  //   return await modal.present();
  // }
  async openEditCard(isVehicle: boolean = false, index?: number) {
    const modal = await this.modalCtrl.create({
      component: EditCardComponent,
      componentProps: { data: this.currentUser, addVehicleClicked: isVehicle, vehicleIndex: index },
    });

    modal.onDidDismiss().then((dataFromModal) => {
      if (dataFromModal.data) {
        this.vehicle = dataFromModal.data.vehicles;
      }
    });

    return await modal.present();
  }

  deleteVehicle(index: number) {
    this.vehicle.splice(index, 1);
    // this.updateVehiclesInFirebase();
  }

  // updateVehiclesInFirebase() {
  //   this.handleData.updateDocument(this.currentUserData, { vehicle: this.vehicle });
  // }
}
