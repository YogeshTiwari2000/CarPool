import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonIcon, ModalController, IonBackButton, IonAvatar, IonGrid, IonRow, IonCol, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-top-withdraw',
  templateUrl: './top-withdraw.page.html',
  styleUrls: ['./top-withdraw.page.scss'],
  standalone: true,
  imports: [IonButton, IonCol, IonRow, IonGrid, IonAvatar, IonBackButton, IonIcon, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton, RouterLink]
})
export class TopWithdrawPage implements OnInit {

  // constructor() { }
  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    console.log("top-up");
  }
  // close() {
  //   this.modalCtrl.dismiss()
  // }

}
