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
  IonCardSubtitle,
} from "@ionic/angular/standalone";
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from "@angular/router";
import { EditCardComponent } from "src/app/modals/edit-card/edit-card.component";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
  standalone: true,
  imports: [
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

  constructor() {}

  ngOnInit() {
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

  async openEditCard() {
    const modal = await this.modalCtrl.create({
      component: EditCardComponent,
      componentProps: { data: this.currentUser },
    });

    modal.onDidDismiss().then((dataFromModal) => {
      if (dataFromModal !== null) {
        console.log("The result:", dataFromModal.data);
      }
    });

    return await modal.present();
  }
}
