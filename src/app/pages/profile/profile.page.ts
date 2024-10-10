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
  IonCardSubtitle, IonRow, IonCol, IonButton, IonInput
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
import { addIcons } from "ionicons";
import { addCircleOutline, create } from "ionicons/icons";
import { EditVehicleComponent } from "src/app/modals/edit-vehicle/edit-vehicle.component";
import { LocalNotifications, ScheduleOptions } from "@capacitor/local-notifications";

// import { VehicleComponent } from "src/app/modals/vehicle/vehicle.component";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
  standalone: true,
  imports: [IonInput, IonButton, IonCol, IonRow,
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
  currentUserDocId: any;
  addVehicle: boolean = false;
  selectedFile: File | null = null;
  uploadedFileUrl: string | null = null;

  constructor(private commonService: CommonService, public localStr: LocalStorageService, private handleData: HandleDataService) {
    addIcons({ addCircleOutline, create });
  }

  ngOnInit() {
    this.currentUserDocId = this.localStr.getItem("currentUserDocId");

    console.log("uploadedFileUrl", this.uploadedFileUrl);

    const currentUserEmail = this.commonService.currentUserEmail;
    console.log("currentUserEmail === ", currentUserEmail);
    // Retrieve data from Firebase and store it in local storage
    this.handleData.userExists(currentUserEmail).then((res) => {

      this.currentUserData = res.data;
      console.log("current user data", this.currentUserData);
      this.currentUser = res.data;
      console.log("this.currentUser === ", this.currentUser);

      // this.vehicle = this.currentUser.vehicleDetails
      this.vehicle = this.currentUserData.vehicle.vehicleList || [];
      console.log(" this.vehicle === ", this.vehicle);


    })

    const data: any = localStorage.getItem("currentUser");
    const parsedData: any = JSON.parse(data);
    // console.log("data === ", parsedData);

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

  async openEditCard(isVehicle: boolean = false) {
    const modal = await this.modalCtrl.create({
      component: EditCardComponent,
      componentProps: {
        data: this.currentUser,
        addVehicleClicked: isVehicle,
      },
    });

    modal.onDidDismiss().then((dataFromModal) => {
      if (dataFromModal.data) {
        this.vehicle = dataFromModal.data; // This is the updated vehicle list
      }
    });

    return await modal.present();
  }


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFile = input.files[0];
    }
  }

  async uploadFile() {
    if (this.selectedFile) {
      this.uploadedFileUrl = await this.handleData.fileUploadToFirebase(this.selectedFile);
      console.log("Uploaded file URL: ", this.uploadedFileUrl);
      this.currentUserData.profilePicture = this.uploadedFileUrl
      console.log("currentUser.profilePicture === ", this.currentUserData.profilePicture);
      this.handleData.updateDocumentField(this.currentUserDocId, 'profilePicture', this.currentUserData.profilePicture);
      console.log("currentUserData === ", this.currentUserData);
    } else {
      console.log('No file selected');
    }
  }


  deleteVehicle(index: number) {

    this.currentUserData.vehicle.vehicleList.splice(index, 1);

    this.handleData.updateDocumentField(this.currentUserDocId, 'vehicle', this.currentUserData.vehicle);
  }


  async editVehicle(index: number) {
    const selectedVehicle = this.vehicle[index];
    // console.log("selectedVehicle === ", selectedVehicle);
    const modal = await this.modalCtrl.create({
      component: EditVehicleComponent,
      componentProps: { data: this.currentUser, selectedVehicle: selectedVehicle, }
    });

    // Handling the data returned from the modal
    modal.onDidDismiss().then((result) => {

    });

    modal.present();
  }





}
