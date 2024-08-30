import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, ModalController, ToastController, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { LoginComponent } from 'src/app/modals/login/login.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HandleDataService } from 'src/app/services/data/handle-data.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [IonButtons, IonMenuButton, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, RouterLinkActive,]
})
export class WelcomePage implements OnInit {
  public modalCtl = inject(ModalController)
  private handleData = inject(HandleDataService);
  localStorageService = inject(LocalStorageService);
  commonService = inject(CommonService);
  routes = inject(Router);
  toastController = inject(ToastController);
  currentUserData: any;
  isLoggedIn: boolean = false;

  constructor() { }

  ngOnInit() {
    console.log("welcome page");
    this.handleData.requestPermission(); // Request permission on initialization 
  }
  ionViewWillEnter() {
    const currentUserEmail = this.commonService.currentUserEmail;

    this.handleData.userExists(currentUserEmail).then((res) => {
      this.currentUserData = res.data;
      console.log(" this.currentUserData === ", this.currentUserData);
      this.isLoggedIn = this.currentUserData ? true : false; // Set isLoggedIn based on user existence 

    });
  }


  async reqRide() {
    if (this.isLoggedIn) {
      this.routes.navigate(['/create-ride'])
    }
    else {


      const toast = await this.toastController.create({
        message: 'login before request a ride',
        duration: 1500,
        position: 'bottom',
      });

      await toast.present();
    }
  }

  async loginModal() {
    const modal = await this.modalCtl.create({
      component: LoginComponent,
    })
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    console.log("data", data, role);

  }
  sendNotification() {
    const recipientToken = 'RECIPIENT_DEVICE_FCM_TOKEN'; // Replace with the recipient's token
    const title = 'Notification Title';
    const body = 'Notification Body';

    this.handleData.sendNotification(recipientToken, title, body);
  }
}
