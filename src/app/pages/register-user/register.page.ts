import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonRow, IonCol, IonMenuButton, IonInput, IonItem, IonInputPasswordToggle, IonButton, IonBackButton, IonAvatar } from '@ionic/angular/standalone';
import { SocialLoginService } from 'src/app/services/auth/social-login.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';
import { HandleDataService } from 'src/app/services/data/handle-data.service';
import { Observable } from 'rxjs';

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
  private handleData = inject(HandleDataService)

  users$: Observable<any[]> = new Observable();

  // users: any[] = []
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
  users:any;
  
  // userData: UserData = new UserData()

  constructor() { }

  // async ngOnInit() {
  //   if (this.localStr.getItem("users")) {
  //     // this.users = this.localStr.getItem("users")
  //     this.users$ = this.handleData.getData()
  //   }
  //   await this.socialLogin.googleLogin("google").then((res) => {
  //     this.localStr.setItem("googleUserLog", JSON.parse(res))
  //     let googleLogin = this.localStr.getItem("googleUserLog")
  //     if (googleLogin) {
  //       console.log("googleLogin === ", googleLogin);
  //       this.userData.userEmail = googleLogin.email
  //       this.userData.userName = googleLogin.name
  //       this.userData.isSocialLogin = true
  //       this.userData.email_verified = googleLogin.email_verified
  //     }
  //   }).catch((error) => console.log(error))

  // }

  async ngOnInit() {
    this.users$ = this.handleData.getData();

    try {
      const res = await this.socialLogin.googleLogin("google");
      this.localStr.setItem("googleUserLog", JSON.parse(res));
      const googleLogin = this.localStr.getItem("googleUserLog");

      if (googleLogin) {
        console.log("googleLogin === ", googleLogin);
        this.userData.userEmail = googleLogin.email;
        this.userData.userName = googleLogin.name;
        this.userData.isSocialLogin = true;
        this.userData.email_verified = googleLogin.email_verified;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // onSubmit(form: NgForm) {
  //   if (form.valid) {
  //     // console.log('Form submitted!', form.value);
  //     // console.log('Form submitted!', this.userData);
  //     let data: { [key: string]: any } = {}
  //     data[this.userData.userEmail] = { ...this.userData };

  //     this.users$.push(data)
  //     // this.users.push(data)
  //     console.log('this.users', this.users$);

  //     this.localStr.setItem('users', this.users$)
  //     // this.localStr.setItem('users', this.users)
  //     this.commonService.isUserLoggedin = true
  //     this.commonService.currentUserEmail = this.userData.userEmail
  //     const isUserLoggedIn = this.commonService.isUserLoggedin
  //     this.localStr.setItem("isUserLoggedIn", isUserLoggedIn)
  //     this.router.navigate(['/home'])
  //     form.reset()
  //   } else {
  //     this.commonService.alertBox("Form is invalid", "Form alert", ["Ok"])
  //   }
  // }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const email = this.userData.userEmail;
      console.log("email === ", email);

      this.handleData.checkUserExists(email).subscribe(userExists => {
        console.log("userExists === ", userExists);
        if (userExists) {
          this.commonService.alertBox("User already exists", "Registration Error", ["Ok"]);
        } else {
          const data = { [email]: { ...this.userData } };

          this.handleData.addUser(data).subscribe(() => {
            this.localStr.setItem('currentUser', data[email]);
            this.commonService.isUserLoggedin = true;
            this.commonService.currentUserEmail = email;
            const isUserLoggedIn = this.commonService.isUserLoggedin;
            this.localStr.setItem("isUserLoggedIn", isUserLoggedIn);
            this.router.navigate(['/home']);
            form.reset();
          });
        }
      });
    } else {
      this.commonService.alertBox("Form is invalid", "Form alert", ["Ok"]);
    }
  }
  passwordsMatch(password: any): boolean {
    return this.userData.cpassword === password;
  }

  async facebookLogin() {
    console.log('facebook login btn called');
    this.socialLogin.facebookLogin().then(user => {
      console.log('Facebook login successful:', user);
      this.localStr.setItem("facevookUserLog", user);
      let getData: any[] = this.localStr.getItem("users")
      const fbuser = this.commonService.checkEmailExists(getData, user.email)
      console.log('fbuser check email exist or not', fbuser);

      if (fbuser) {
        console.log('Email exists in the data', fbuser);
        this.commonService.alertBox("User already exist", "Login alert", ["Ok"])
        this.router.navigate(['/home'])
      } else {
        console.log('Email does not exist in the data');
        this.userData.userEmail = user.email
        this.userData.userName = user.name
        this.userData.email_verified = true
        this.userData.isSocialLogin = true
        console.log("this.userData === ", this.userData);


        if (this.localStr.getItem("users")) {
          this.users = this.localStr.getItem("users")
        }


        let data: { [key: string]: any } = {}
        data[this.userData.userEmail] = { ...this.userData };

        this.users.push(data)
        console.log('this.users', this.users);

        this.localStr.setItem('users', this.users)
        this.commonService.isUserLoggedin = true
        this.commonService.currentUserEmail = user.email
        const isUserLoggedIn = this.commonService.isUserLoggedin
        this.localStr.setItem("isUserLoggedIn", isUserLoggedIn)
        // this.close()
        this.router.navigate(['/home'])
      }

    }).catch(err => {
      console.error('Error during Facebook login:', err);
    });
  }


}

// strongly typed dataStructure for user Data 
// export class UserData {
//   userEmail: string;
//   userName: string;
//   password: string;
//   cpassword: string;
//   phone: number;
//   pickUpLocation: string;
//   dropLocation: string;
//   isSocialLogin: boolean;
//   email_verified: boolean;
//   constructor() {
//     this.userEmail = "";
//     this.userName = "";
//     this.password = "";
//     this.cpassword = "";
//     this.phone = 0;
//     this.pickUpLocation = "";
//     this.dropLocation = "";
//     this.isSocialLogin = false;
//     this.email_verified = false
//   }
// }
