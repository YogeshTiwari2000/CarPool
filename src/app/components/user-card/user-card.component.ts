import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { IonInput, IonHeader, IonContent, IonCard, IonThumbnail, IonItem, IonLabel, IonCardHeader, IonAvatar, IonCardTitle, IonIcon, IonCardSubtitle, IonCardContent, IonRow, IonButton, IonCol, ModalController } from "@ionic/angular/standalone";
import { UserDetailsComponent } from 'src/app/modals/user-details/user-details.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  standalone: true,
  imports: [IonCol, IonButton, IonRow, IonCardContent, IonCardSubtitle, IonIcon, IonCardTitle, IonAvatar, IonCardHeader, IonLabel, IonItem, IonCard, IonContent, IonHeader, IonInput, IonThumbnail, CommonModule],
})
export class UserCardComponent implements OnInit {
  @Input() userInfo: any;
  dateInput: string | undefined;
  journeyDuration: string | undefined;
  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    console.log("it's user card ts working");
    console.log(this.userInfo);
    this.dateInput = this.userInfo['date'];
    this.calculateJourneyDuration();
  }
  async userDetailModal(userInfo: any) {
    console.log("clicked");
    const modal = await this.modalCtrl.create({
      component: UserDetailsComponent,
      componentProps: { userData: userInfo, journeyDuration: this.journeyDuration }
    })

    modal.present()
  }

  calculateJourneyDuration() {
    const journeyStart = this.userInfo['journeyStart'];
    const journeyEnd = this.userInfo['journeyEnd'];
    const dateInData = this.userInfo['date'];

    // Create a Date object from the dateInData
    const dateParts = dateInData.split('/');
    const date = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);

    // Set hours and minutes for journeyStart and journeyEnd
    const [startHours, startMinutes] = journeyStart.split(':').map(Number);
    const [endHours, endMinutes] = journeyEnd.split(':').map(Number);

    const start = new Date(date);
    start.setHours(startHours, startMinutes);

    const end = new Date(date);
    end.setHours(endHours, endMinutes);

    const diffMs = end.getTime() - start.getTime();

    const diffHrs = Math.floor(diffMs / 3600000); // 1 hour = 3600000 ms
    const diffMins = Math.round((diffMs % 3600000) / 60000); // 1 minute = 60000 ms

    // Format the duration as HH:MM
    const formattedHours = diffHrs.toString().padStart(2, '0');
    const formattedMinutes = diffMins.toString().padStart(2, '0');

    this.journeyDuration = `${formattedHours}h ${formattedMinutes}m`;
    console.log("this.journeyDuration", this.journeyDuration);
  }

}
