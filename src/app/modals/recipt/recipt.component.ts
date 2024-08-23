import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonTitle, IonMenuButton, ModalController, IonBackButton, IonContent, IonCard, IonItem, IonCardHeader, IonIcon, IonLabel, IonCardContent, IonButton, IonItemDivider, IonAvatar } from "@ionic/angular/standalone";

@Component({
  selector: 'app-recipt',
  templateUrl: './recipt.component.html',
  styleUrls: ['./recipt.component.scss'],
  standalone: true,
  imports: [IonAvatar, IonItemDivider, IonButton, IonCardContent, IonLabel, IonIcon, IonCardHeader, IonItem, IonCard, IonContent, IonBackButton, IonTitle, IonButtons, IonToolbar, IonHeader, IonMenuButton],
})
export class ReciptComponent implements OnInit {
  public modalCtrl = inject(ModalController);

  constructor() { }

  ngOnInit() {
    console.log();
  }

  close() {
    return this.modalCtrl.dismiss(null, "close");
  }
}
