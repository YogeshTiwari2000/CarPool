import { Component, Input, OnInit } from '@angular/core';
import { ModalController, IonButton, IonGrid, IonRow, IonCol, IonIcon, IonCard, IonCardHeader, IonCardContent, IonItem, IonAvatar, IonLabel, IonContent, IonChip, IonList, IonCardTitle, IonBadge, IonListHeader } from '@ionic/angular/standalone';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  standalone: true,
  imports: [IonListHeader, IonBadge, IonCardTitle, IonList, IonChip, IonContent, IonLabel, IonAvatar, IonItem, IonCardContent, IonCardHeader, IonCard, IonIcon, IonCol, IonRow, IonGrid, IonButton,],
})
export class UserDetailsComponent implements OnInit {
  @Input() userData: any;
  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    console.log("user details");
    console.log("user details", this.userData);
  }

  close() {
    this.modalCtrl.dismiss()
  }









}
