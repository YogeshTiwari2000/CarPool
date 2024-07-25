import { Component, inject, OnInit } from '@angular/core';
import { IonInput, IonInputPasswordToggle, IonContent, IonHeader, IonToolbar, IonTitle, ModalController, IonIcon, IonButton, IonCol, IonRow } from "@ionic/angular/standalone";
import { ForgotPassComponent } from '../forgot-pass/forgot-pass.component';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonRow, IonCol, IonButton, IonIcon, IonTitle, IonToolbar, IonHeader, IonContent, IonInput, IonInputPasswordToggle, FormsModule, CommonModule]
})
export class LoginComponent implements OnInit {
  public modalCtrl = inject(ModalController)
  public router = inject(Router)

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
  registerUser() {
    this.close()
    this.router.navigate(['/register'])
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form submitted!', form.value);
    } else {
      alert('Form is invalid')
    }
  }

}
