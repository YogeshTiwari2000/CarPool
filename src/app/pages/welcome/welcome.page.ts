import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, ModalController } from '@ionic/angular/standalone';
import { LoginComponent } from 'src/app/modals/login/login.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HandleDataService } from 'src/app/services/data/handle-data.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, RouterLinkActive]
})
export class WelcomePage implements OnInit {
  public modalCtl = inject(ModalController)
  private handleData = inject(HandleDataService);
  localStorageService = inject(LocalStorageService);
  commonService = inject(CommonService);
  currentUserData: any;
  isLoggedIn: boolean = false;

  constructor() { }

  ngOnInit() {
    console.log("welcome page");
  }
  ionViewWillEnter() {
    const currentUserEmail = this.commonService.currentUserEmail;

    this.handleData.userExists(currentUserEmail).then((res) => {
      this.currentUserData = res.data;
      this.isLoggedIn = this.currentUserData ? true : false; // Set isLoggedIn based on user existence
      console.log("this.currentUserData.isSocialLogin === ", this.currentUserData.isSocialLogin);
      console.log("this.currentUserData.isSocialLogin === ", this.currentUserData.isSocialLogin);

    });
  }
  async loginModal() {
    const modal = await this.modalCtl.create({
      component: LoginComponent,
    })
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    console.log("data", data, role);

  }

}
