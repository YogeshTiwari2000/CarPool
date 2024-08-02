import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonAvatar, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonIcon, IonLabel, ModalController } from '@ionic/angular/standalone';
import { EditCardComponent } from 'src/app/modals/edit-card/edit-card.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [IonLabel, IonIcon, IonItem, IonCardContent, IonCardSubtitle, IonCardTitle, IonAvatar, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AboutPage implements OnInit {
  public modalCtrl = inject(ModalController)

  currentUser: any = ''
  isEmailVerified: boolean = false
  isPhoneVerified: boolean = false
  isGovtIdVerified: boolean = false

  constructor() { }

  ngOnInit() {
    const data: any = localStorage.getItem('currentUser');
    const parsedData: any = JSON.parse(data)

    const keys = Object.keys(parsedData);
    // const firstKey = keys[0];
    const firstKey = keys[1];
    this.currentUser = parsedData[firstKey];
    console.log(this.currentUser);

    this.isEmailVerified = this.currentUser.email_verified ? true : false
    this.isPhoneVerified = this.currentUser.phone_verified ? true : false
    this.isGovtIdVerified = this.currentUser.govtId_verified ? true : false
  }

  async openEditCard() {
    const modal = await this.modalCtrl.create({
      component: EditCardComponent
    })

    modal.present()
  }

}

