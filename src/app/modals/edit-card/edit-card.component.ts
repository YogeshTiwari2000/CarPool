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
    CommonModule,
    FormsModule,
    IonInputPasswordToggle,
    IonSelect,
    IonSelectOption,
  ],
})
export class EditCardComponent implements OnInit {
  @Input() data: any;
  @Input() addVehicleClicked: any;


  public modalCtrl = inject(ModalController);
  private handleData = inject(HandleDataService);
  private localStr = inject(LocalStorageService);

  checkDocs?: boolean = false;
  userRole = "passenger";
  // userRole = "driver";
  fileDetails: any;

  vehicleDetails: any = {
    vehicleType: "",
    vehicleNumber: "",
    vehicleName: "",
    vehicleColor: '',
  };

  about: any = {
    miniBio: "",
    travelPreference: [],
  };
  govtDocs: any = {
    fileDetails: "",
    url: "",
  };

  // fileContent: string | ArrayBuffer | null | any = null;
  file: any;

  constructor() { }

  ngOnInit() {
    console.log("addVehicleClicked === ", this.addVehicleClicked);
    this.handleData
      .userExists(this.data.userEmail)
      .then((res) => {
        this.data = res.data;
        console.log("this.data updated === ", this.data);
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
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
    console.log("edit modal", this.data);
  }

  passCheck = false;
  validatePassword() {
    if (this.data.password != this.data.cpassword) {
      this.passCheck = true;
    } else {
      this.passCheck = false;
    }
  }

  changePass = false;
  togglePassChange() {
    this.changePass = !this.changePass;
  }

  async updateData() {
    if (this.data) {
      if (this.data.password) {
        this.data.password = this.handleData.encryptPass(this.data.password);
      }
      if (this.file) {
        const fileUrl = this.handleData
          .fileUploadToFirebase(this.file)
          .then((res) => {
            this.govtDocs = {
              fileDetails: this.fileDetails,
              url: res,
            };
            this.data.govtDocs = this.govtDocs;
            // console.log("res === ", res);
            console.log("Updated File Details with URL:", this.data.govtDocs);

            //update document
            this.updateDoc();
            // let _data = {
            //   ...this.data,
            //   vehicleDetails: this.vehicleDetails,
            //   about: this.about,
            //   govtDocs: this.govtDocs,
            // };
            // if (this.userRole === "driver" && this.checkDocs === true) {
            //   console.log("edit if modal", _data);
            // } else {
            //   console.log("edit else modal", _data);
            //   const currentUserDocId =
            //     this.localStr.getItem("currentUserDocId");
            //   // console.log("data1", this.data);

            //   if (currentUserDocId) {
            //     this.handleData
            //       .updateDocument(currentUserDocId, _data)
            //       .then(() => {
            //         let updateData = this.handleData
            //           .userExists(this.data.userEmail)
            //           .then((res) => {
            //             this.data = res.data;
            //             console.log("this.data updated === ", this.data);
            //             this.localStr.setItem("currentUser", this.data);
            //             this.localStr.setItem("currentUser", _data);
            //             // this.close();
            //           })
            //           .catch((error) => {
            //             console.error("Error: ", error);
            //           });
            //       });
            //   } else {
            //     console.error("Error: currentUserDocId is null or undefined.");
            //   }
            // }
          })
          .catch((e) => {
            console.error("Error: ", e);
          });
      } else {
        this.updateDoc();
      }
      // return;
    } else {
      console.error("Error: this.data is null or undefined.");
    }
  }

  updateDoc() {
    let _data = {
      ...this.data,
      vehicleDetails: this.vehicleDetails,
      about: this.about,
      govtDocs: this.govtDocs,
    };
    if (this.userRole === "driver" && this.checkDocs === true) {
      console.log("edit if modal", _data);
    } else {
      console.log("edit else modal", _data);
      const currentUserDocId = this.localStr.getItem("currentUserDocId");
      // console.log("data1", this.data);

      if (currentUserDocId) {
        this.handleData.updateDocument(currentUserDocId, _data).then(() => {
          let updateData = this.handleData
            .userExists(this.data.userEmail)
            .then((res) => {
              this.data = res.data;
              console.log("this.data updated === ", this.data);
              this.localStr.setItem("currentUser", this.data);
              this.localStr.setItem("currentUser", _data);
              this.close();
            })
            .catch((error) => {
              console.error("Error: ", error);
            });
        });
      } else {
        console.error("Error: currentUserDocId is null or undefined.");
      }
    }
  }

  close() {
    const data = this.data;
    this.modalCtrl.dismiss(data, "backdrop");
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
