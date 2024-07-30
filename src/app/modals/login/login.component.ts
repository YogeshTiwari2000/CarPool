import { Component, inject, OnInit } from '@angular/core';
import { IonInput, IonInputPasswordToggle, IonContent, IonHeader, IonToolbar, IonTitle, ModalController, IonIcon, IonButton, IonCol, IonRow, IonAvatar } from "@ionic/angular/standalone";
import { ForgotPassComponent } from '../forgot-pass/forgot-pass.component';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SocialLoginService } from 'src/app/services/auth/social-login.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { from } from 'rxjs';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonAvatar, IonRow, IonCol, IonButton, IonIcon, IonTitle, IonToolbar, IonHeader, IonContent, IonInput, IonInputPasswordToggle, FormsModule, CommonModule]
})
export class LoginComponent implements OnInit {
  public modalCtrl = inject(ModalController)
  public router = inject(Router)
  private socialLogin = inject(SocialLoginService)
  public localStr = inject(LocalStorageService)
  public commonService = inject(CommonService)

  isSocialLogin: boolean = false

  userData: any = {
    userEmail: "",
    userName: "",
    password: "",
    cpassword: "",
    phone: "",
    pickUpLocation: "",
    dropLocation: "",
    isSocialLogin: this.isSocialLogin
  }

  constructor() { }

  async ngOnInit() {
    console.log("Login Modal", this.userData);
    await this.socialLogin.googleLogin("google").then((res) => {
      this.localStr.setItem("googleUserLog", JSON.parse(res))
      if (this.localStr.getItem("googleUserLog")) {
        let googleLogin = this.localStr.getItem("googleUserLog")
        console.log("googleLogin === ", googleLogin);
        this.userData.userEmail = googleLogin.email
        this.userData.userName = googleLogin.name
        this.userData.isSocialLogin = true
      }
    }).catch((error) => console.log(error))
    if (this.localStr.getItem("userData")) {
      this.userData = this.localStr.getItem("userData")
    }
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
      const loginData = form.value
      console.log('Form submitted!', form.value);
      if (this.userData) {
        if (this.userData.password === loginData.password) {
          this.commonService.isUserLoggedin = true
          const isUserLoggedIn = this.commonService.isUserLoggedin
          this.localStr.setItem("isUserLoggedIn", isUserLoggedIn)
          this.close()
          this.router.navigate(['/home'])

        }
      }
    } else {
      alert('Form is invalid')
    }
  }


  // for facebook
  facebookLogin() {
    console.log('facebook login btn called');
    this.socialLogin.facebookLogin();
  }

}
