import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonRow, IonCol, IonMenuButton, IonInput, IonItem, IonInputPasswordToggle, IonButton, IonBackButton } from '@ionic/angular/standalone';
import { SocialLoginService } from 'src/app/services/auth/social-login.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButton, IonItem, IonInput, IonCol, IonRow, IonButtons, IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInputPasswordToggle,]
})
export class RegisterPage implements OnInit {
  private socialLogin = inject(SocialLoginService)
  public localStr = inject(LocalStorageService)
  public router = inject(Router)
  public commonService = inject(CommonService)


  constructor() { }

  ngOnInit() {
    console.log("register user");
    this.socialLogin.googleLogin("google")
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form submitted!', form.value);
      this.localStr.setItem('userData', form.value)
      this.commonService.isUserLoggedin = true
      const isUserLoggedIn = this.commonService.isUserLoggedin
      this.localStr.setItem("isUserLoggedIn", isUserLoggedIn)
      this.router.navigate(['/home'])
    } else {
      alert('Form is invalid')
    }
  }

}
