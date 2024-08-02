import { Component, Input, OnInit } from '@angular/core';
import { ModalController, IonButton, IonGrid, IonRow, IonCol, IonIcon, IonCard, IonCardHeader, IonCardContent, IonItem, IonAvatar, IonLabel, IonContent, IonChip, IonList, IonCardTitle, IonBadge, IonListHeader, IonCardSubtitle, IonImg, IonHeader, IonTitle, IonToolbar, IonText, IonNote } from '@ionic/angular/standalone';

@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.component.html',
  styleUrls: ['./ride-details.component.scss'],
  standalone: true,
  imports: [IonNote, IonText, IonToolbar, IonTitle, IonHeader, IonImg, IonCardSubtitle, IonListHeader, IonBadge, IonCardTitle, IonList, IonChip, IonContent, IonLabel, IonAvatar, IonItem, IonCardContent, IonCardHeader, IonCard, IonIcon, IonCol, IonRow, IonGrid, IonButton,],
})
export class UserDetailsComponent implements OnInit {
  @Input() userData: any;
  @Input() journeyDuration: any;
  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    console.log("user details");
    console.log("user details", this.userData);
  }

  close() {
    this.modalCtrl.dismiss()
  }
  calculateTotalPrice(): number {
    return this.userData.price * this.userData.seatAvl;
  }









}
