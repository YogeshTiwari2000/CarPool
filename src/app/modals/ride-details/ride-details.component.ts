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

  dateFormat(dateString: string): string {
    const date = new Date(dateString);
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const weekday = weekdays[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];

    return `${weekday} ${day} ${month}`;
  }







}
