import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonRow, IonCol, IonMenuButton, IonInput, IonItem, IonInputPasswordToggle, IonButton, IonBackButton, IonAvatar } from '@ionic/angular/standalone';
import { SocialLoginService } from 'src/app/services/auth/social-login.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonAvatar, IonBackButton, IonButton, IonItem, IonInput, IonCol, IonRow, IonButtons, IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInputPasswordToggle,]
})
export class RegisterPage implements OnInit {
  private socialLogin = inject(SocialLoginService)
  public localStr = inject(LocalStorageService)
  public router = inject(Router)
  public commonService = inject(CommonService)
  users: any[] = []
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
    console.log("register user", this.userData);
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
    if (this.localStr.getItem("users")) {
      this.users = this.localStr.getItem("users")
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      // console.log('Form submitted!', form.value);
      // console.log('Form submitted!', this.userData);
      let data: { [key: string]: any } = {}
      data[form.value.email] = { ...this.userData };

      this.users.push(data)
      console.log('this.users', this.users);

      this.localStr.setItem('users', this.users)
      this.commonService.isUserLoggedin = true
      const isUserLoggedIn = this.commonService.isUserLoggedin
      this.localStr.setItem("isUserLoggedIn", isUserLoggedIn)
      this.router.navigate(['/home'])
    } else {
      alert('Form is invalid')
    }
  }

  passwordsMatch(password: any): boolean {
    return this.userData.cpassword === password;
  }

  // for facebook
  facebookLogin() {
    console.log('facebook login btn called');
    this.socialLogin.facebookLogin();
  }


}
