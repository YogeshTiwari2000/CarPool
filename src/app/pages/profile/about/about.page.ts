import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonAvatar, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonIcon, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [IonLabel, IonIcon, IonItem, IonCardContent, IonCardSubtitle, IonCardTitle, IonAvatar, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AboutPage implements OnInit {

  isEmailVerified: boolean = false
  isPhoneVerified: boolean = false
  isGovtIdVerified: boolean = false


  constructor() { }

  ngOnInit() {
    console.log("about")
    const data: any = localStorage.getItem('googleUserLog');
    const parsedData: any = JSON.parse(data)
    console.log(parsedData);

    console.log('parsedData.email', parsedData.email);
    this.isEmailVerified = this.checkEmailVerified(parsedData.email)
    this.isPhoneVerified = this.checkPhoneVerified(parsedData.phone)
    this.isGovtIdVerified = this.checkIsGovtIdVerified(parsedData.govtId)
  }
  checkEmailVerified(email: string): boolean {
    return email != '';
  }
  checkPhoneVerified(phone: number): boolean {
    return phone != null;
  }
  checkIsGovtIdVerified(govtId: number): boolean {
    return govtId != null;
  }

}

