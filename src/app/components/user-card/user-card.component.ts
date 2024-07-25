import { Component, OnInit } from '@angular/core';
import { IonInput, IonHeader, IonContent, IonCard, IonThumbnail, IonItem, IonLabel, IonCardHeader, IonAvatar, IonCardTitle, IonIcon, IonCardSubtitle, IonCardContent, IonRow, IonButton, IonCol, ModalController } from "@ionic/angular/standalone";
import { UserDetailsComponent } from 'src/app/modals/user-details/user-details.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  standalone: true,
  imports: [IonCol, IonButton, IonRow, IonCardContent, IonCardSubtitle, IonIcon, IonCardTitle, IonAvatar, IonCardHeader, IonLabel, IonItem, IonCard, IonContent, IonHeader, IonInput, IonThumbnail],
})
export class UserCardComponent implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    console.log("it's user card ts working");

  }
  async userDetailModal(event: any) {
    console.log("clicked");
    const modal = await this.modalCtrl.create({
      component: UserDetailsComponent
    })

    modal.present()
  }
}
