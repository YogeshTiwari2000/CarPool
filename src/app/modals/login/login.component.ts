import { Component, inject, OnInit } from '@angular/core';
import { IonInput, IonInputPasswordToggle, IonContent, IonHeader, IonToolbar, IonTitle, ModalController, IonIcon, IonButton } from "@ionic/angular/standalone";
import { ForgotPassComponent } from '../forgot-pass/forgot-pass.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonTitle, IonToolbar, IonHeader, IonContent, IonInput, IonInputPasswordToggle]
})
export class LoginComponent implements OnInit {
  public modalCtrl = inject(ModalController)

  constructor() { }

  ngOnInit() {
    console.log("Login Modal");
  }
  close() {
    return this.modalCtrl.dismiss(null, 'close');
  }
  async forgotPassModal() {
    const modal = await this.modalCtrl.create({
      component: ForgotPassComponent,
      cssClass: ["forgotPassModalCss", "ion-padding-horizontal"],
      showBackdrop: true
    })
    modal.present()
  }

}
