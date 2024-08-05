import { Component, inject, OnInit } from '@angular/core';
import { IonInput, IonInputPasswordToggle, IonContent, IonHeader, IonToolbar, IonTitle, ModalController, IonIcon, IonButton, IonCol, IonRow, IonAvatar } from "@ionic/angular/standalone";
import { ForgotPassComponent } from '../forgot-pass/forgot-pass.component';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SocialLoginService } from 'src/app/services/auth/social-login.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { from, Observable } from 'rxjs';
import { CommonService } from 'src/app/shared/common.service';
import { HandleDataService } from 'src/app/services/data/handle-data.service';

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
  private handleData = inject(HandleDataService)

  users: any;
  // users$: Observable<any[]> = new Observable();

  isSocialLogin: boolean = false
  email_verified: boolean = false

  userData: any = {
    profilePicture: "",
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
    this.users = this.handleData.getData();

    // googleLogin
    await this.socialLogin.googleLogin("google").then((res) => {
      this.localStr.setItem("googleUserLog", JSON.parse(res));
      const googleLogin = this.localStr.getItem("googleUserLog");

      if (googleLogin) {
        console.log("googleLogin === ", googleLogin);
        this.userData.userEmail = googleLogin.email;
        this.handleData.checkUserExists(this.userData.userEmail).subscribe(userExist => {
          if (userExist) {
            console.log("userExist === ", userExist);
            let currentUser = this.handleData.user
            if (currentUser) {
              this.localStr.setItem('currentUser', currentUser);
            } else {
              this.localStr.setItem('currentUser', googleLogin);
            }
            this.commonService.isUserLoggedin = true;
            this.commonService.currentUserEmail = this.userData.userEmail;
            const isUserLoggedIn = this.commonService.isUserLoggedin;
            this.localStr.setItem("isUserLoggedIn", isUserLoggedIn);
            this.close()
            this.router.navigate(['/home']);
          } else {
            this.userData.email_verified = googleLogin.email_verified
            this.userData.profilePicture = googleLogin.picture
            this.userData.userName = googleLogin.name;
            this.userData.isSocialLogin = true
            const data = { [this.userData.userEmail]: { ...this.userData } };
            console.log("data === ", data);
            this.handleData.addUser(data).subscribe(() => {
              this.localStr.setItem('currentUser', data);
              this.commonService.isUserLoggedin = true;
              this.commonService.currentUserEmail = this.userData.userEmail;
              const isUserLoggedIn = this.commonService.isUserLoggedin;
              this.localStr.setItem("isUserLoggedIn", isUserLoggedIn);
              this.router.navigate(['/home']);
              this.close()
              this.commonService.alertBox("Account created successfully", "Log in", ["Ok"]);
            });
          }
        })
      }
    }).catch((error) => console.log(error));
    // googleLogin
  }

  // formLogin
  onSubmit(form: NgForm) {
    if (form.valid) {
      let userEmail = form.value.email
      this.handleData.checkUserExists(userEmail).subscribe(userExists => {
        if (userExists) {
          console.log("userExists === ", userExists);
          let currentUser: any = this.handleData.user
          console.log(currentUser);
          if (currentUser[userEmail].password === form.value.password) {
            this.commonService.isUserLoggedin = true
            const isUserLoggedIn = this.commonService.isUserLoggedin
            this.localStr.setItem("isUserLoggedIn", isUserLoggedIn)
            this.close()
            this.router.navigate(['/home'])
          } else {
            this.commonService.alertBox("Please create your account", "Login alert", ["Ok"]);
            this.router.navigate(['/register'])

          }

        }
      })
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
  // formLogin


  // facebookLogin
  async facebookLogin() {
    try {
      this.socialLogin.facebookLogin().then(faceBookUser => {
        console.log('Facebook login successful:', faceBookUser);
        let fBUser = faceBookUser
        this.localStr.setItem("faceBookUserLog", fBUser);

        if (fBUser) {
          console.log("fBUser === ", fBUser);
          this.userData.userEmail = fBUser.email;
          this.handleData.checkUserExists(this.userData.userEmail).subscribe(userExists => {
            if (userExists) {
              console.log("userExist === ", userExists);
              let currentUser = this.handleData.user
              if (currentUser) {
                this.localStr.setItem('currentUser', currentUser);
              } else {
                this.localStr.setItem('currentUser', fBUser);
              }
              this.commonService.isUserLoggedin = true;
              this.commonService.currentUserEmail = this.userData.userEmail;
              const isUserLoggedIn = this.commonService.isUserLoggedin;
              this.localStr.setItem("isUserLoggedIn", isUserLoggedIn);
              this.close()
              this.router.navigate(['/home']);
            } else {
              this.userData.email_verified = true
              this.userData.isSocialLogin = true
              this.userData.profilePicture = fBUser.photoUrl
              this.userData.userName = fBUser.name
              const data = { [this.userData.userEmail]: { ...this.userData } };
              console.log("data === ", data);
              this.handleData.addUser(data).subscribe(() => {
                this.localStr.setItem('currentUser', data);
                this.commonService.isUserLoggedin = true;
                this.commonService.currentUserEmail = this.userData.userEmail;
                const isUserLoggedIn = this.commonService.isUserLoggedin;
                this.localStr.setItem("isUserLoggedIn", isUserLoggedIn);
                this.router.navigate(['/home']);
                this.close()
                this.commonService.alertBox("Account created successfully", "Log in", ["Ok"]);
              });
            }
          })
        }

      }).catch(err => {
        console.error('Error during Facebook login:', err);
      });
    } catch (error: any) {
      this.commonService.alertBox(error, "Login alert", ["Ok"])
    }

  }
  // facebookLogin


  // login modal
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
