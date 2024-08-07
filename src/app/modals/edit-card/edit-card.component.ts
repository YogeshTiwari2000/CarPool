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
  public modalCtrl = inject(ModalController);
  private handleData = inject(HandleDataService);

  checkDocs?: boolean = false;
  userRole = "passenger";
  // userRole = "driver";
  fileDetails: any;

  constructor() {}

  ngOnInit() {
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

  close() {
    const data = "test data";
    this.modalCtrl.dismiss(data, "backdrop");
  }

  updateData() {
    // if (this.userRole === "driver" && this.checkDocs === false) {
    //   console.log("Drivers cannot update data without verified documents.");
    //   return;
    // }

    this.data.password = this.handleData.encryptPass(this.data.password);

    if (this.userRole === "driver" && this.checkDocs === true) {
      console.log("edit if modal", this.data);
    } else {
      console.log("edit else modal", this.data);
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.checkDocs = true;
      this.fileDetails = {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      };
      console.log("File Details:", this.fileDetails);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log("File Content:", e.target.result);
      };
      reader.readAsText(file);
      this.data.govtDocs = { ...this.fileDetails };
      console.log("File Details:", this.fileDetails);
    }
  }
}
