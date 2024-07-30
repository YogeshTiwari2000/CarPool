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
  users: any[] = []
  isSocialLogin: boolean = false
  email_verified: boolean = false

  userData: any = {
    userEmail: "",
    userName: "",
    password: "",
    cpassword: "",
    phone: "",
    pickUpLocation: "",
    dropLocation: "",
    isSocialLogin: this.isSocialLogin,
    email_verified: this.email_verified
  }

  constructor() { }

  async ngOnInit() {
    console.log("Login Modal", this.userData);
    let getData: any[] = this.localStr.getItem("users")
    // console.log("getData === ", getData);
    await this.socialLogin.googleLogin("google").then((res) => {
      const googleUserLog = JSON.parse(res)
      // console.log("googleUserLog === ", googleUserLog);
      // this.localStr.setItem("googleUserLog", googleUserLog)
      const user = this.commonService.checkEmailExists(getData, googleUserLog.email)
      if (user) {
        console.log('Email exists in the data', user);
        this.router.navigate(['/home'])
      } else {
        console.log('Email does not exist in the data');
        this.userData.userEmail = googleUserLog.email
        this.userData.userName = googleUserLog.name
        this.userData.email_verified = googleUserLog.email_verified
        this.userData.isSocialLogin = true
        console.log("this.userData === ", this.userData);

        this.users = this.localStr.getItem("users")

        let data: { [key: string]: any } = {}
        data[this.userData.userEmail] = { ...this.userData };

        this.users.push(data)
        console.log('this.users', this.users);

        this.localStr.setItem('users', this.users)
        this.commonService.isUserLoggedin = true
        const isUserLoggedIn = this.commonService.isUserLoggedin
        this.localStr.setItem("isUserLoggedIn", isUserLoggedIn)
        this.router.navigate(['/home'])
      }

    }).catch((error) => console.log(error))
  }



  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.localStr.getItem("users")) {

      }
      // const loginData = form.value
      // console.log('Form submitted!', form.value);
      // if (this.userData) {
      //   if (this.userData.password === loginData.password) {
      //     this.commonService.isUserLoggedin = true
      //     const isUserLoggedIn = this.commonService.isUserLoggedin
      //     this.localStr.setItem("isUserLoggedIn", isUserLoggedIn)
      //     this.close()
      //     this.router.navigate(['/home'])

      //   }
      // }
    } else {
      alert('Form is invalid')
    }
  }

  // for facebook
  facebookLogin() {
    console.log('facebook login btn called');
    this.socialLogin.facebookLogin();
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
}
