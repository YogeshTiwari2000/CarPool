import { Component, inject, OnInit } from '@angular/core';
import { ModalController, IonHeader, IonIcon, IonToolbar, IonTitle, IonButton, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonTitle, IonToolbar, IonIcon, IonHeader,]
})
export class EditCardComponent implements OnInit {
  public modalCtrl = inject(ModalController)

  constructor() { }

  ngOnInit() {
    console.log("edit modal");
  }

  close() {
    const data = "test data"
    this.modalCtrl.dismiss(data, "backdrop")
  }

}
