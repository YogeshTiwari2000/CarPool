import { CommonModule } from "@angular/common";
import { Component, inject, Input, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  ModalController,
  IonHeader,
  IonIcon,
  IonToolbar,
  IonTitle,
  IonButton,
  IonContent,
  IonCard,
  IonCol,
  IonInput,
  IonRow,
  IonInputPasswordToggle,
  IonToggle,
  IonFooter,
  IonSelect,
  IonSelectOption,
} from "@ionic/angular/standalone";
import { HandleDataService } from "src/app/services/data/handle-data.service";
import { LocalStorageService } from "src/app/shared/local-storage.service";

@Component({
  selector: "app-edit-card",
  templateUrl: "./edit-card.component.html",
  styleUrls: ["./edit-card.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonFooter,
    IonToggle,
    IonRow,
    IonInput,
    IonCol,
    IonCard,
    IonContent,
    IonButton,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonHeader,
    IonInputPasswordToggle,
    IonSelect,
    IonSelectOption,
  ],
})
export class EditCardComponent implements OnInit {
  @Input() data: any;
  @Input() addVehicleClicked: any;
  @Input() vehicleIndex: any;
  vehicle: any[] = [];

  public modalCtrl = inject(ModalController);
  private handleData = inject(HandleDataService);
  private localStr = inject(LocalStorageService);

  checkDocs: boolean = false;
  userRole: string = "passenger";
  fileDetails: any;

  vehicleDetails: any = [{
    vehicleType: "",
    vehicleNumber: "",
    vehicleName: "",
    vehicleColor: "",
  }];

  about: any = {
    miniBio: "",
    travelPreference: [],
  };

  govtDocs: any = {
    fileDetails: "",
    url: "",
  };

  file: any;

  constructor() { }

  ngOnInit() {
    console.log("addVehicleClicked === ", this.addVehicleClicked);

    this.handleData.userExists(this.data.userEmail).then((res) => {
      this.data = res.data;
      this.vehicle = this.data.vehicleDetails || [];

      if (this.vehicleIndex !== undefined) {
        this.vehicleDetails = this.vehicle[this.vehicleIndex];
      }

      this.localStr.setItem("currentUser", this.data);

      if (this.data.vehicleDetails) {
        this.vehicleDetails = this.data.vehicleDetails;
      }
      if (this.data.about) {
        this.about = this.data.about;
      }
      if (this.data.govtDocs) {
        this.govtDocs = this.data.govtDocs;
      }
    }).catch((error) => {
      console.error("Error: ", error);
    });
  }

  passCheck: boolean = false;

  validatePassword() {
    this.passCheck = this.data.password !== this.data.cpassword;
  }

  changePass: boolean = false;

  togglePassChange() {
    this.changePass = !this.changePass;
  }

  async updateData() {
    if (this.data) {
      if (this.data.password) {
        this.data.password = this.handleData.encryptPass(this.data.password);
      }

      if (this.file) {
        try {
          const fileUrl = await this.handleData.fileUploadToFirebase(this.file);

          if (this.vehicleIndex !== undefined) {
            this.vehicle[this.vehicleIndex] = this.vehicleDetails;
          } else {
            this.vehicle.push(this.vehicleDetails);
          }

          this.data.vehicleDetails = this.vehicle;
          this.govtDocs = { fileDetails: this.fileDetails, url: fileUrl };
          this.data.govtDocs = this.govtDocs;

          console.log("Updated File Details with URL:", this.data.govtDocs);

          this.updateDoc();
        } catch (error) {
          console.error("Error uploading file: ", error);
        }
      } else {
        this.updateDoc();
      }
    } else {
      console.error("Error: this.data is null or undefined.");
    }
  }

  updateDoc() {
    let updatedData = {
      ...this.data,
      vehicleDetails: this.vehicleDetails,
      about: this.about,
      govtDocs: this.govtDocs,
    };

    const currentUserDocId = this.localStr.getItem("currentUserDocId");

    if (currentUserDocId) {
      this.handleData.updateDocument(currentUserDocId, updatedData).then(() => {
        this.handleData.userExists(this.data.userEmail).then((res) => {
          this.data = res.data;
          this.localStr.setItem("currentUser", this.data);
          console.log("User data updated:", this.data);
          this.close();
        }).catch((error) => {
          console.error("Error: ", error);
        });
      }).catch((error) => {
        console.error("Error updating document: ", error);
      });
    } else {
      console.error("Error: currentUserDocId is null or undefined.");
    }
  }

  close() {
    this.modalCtrl.dismiss(this.data, "backdrop");
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file;
      this.checkDocs = true;
      this.fileDetails = {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      };
      console.log("File Details:", this.fileDetails);
    }
  }
}
