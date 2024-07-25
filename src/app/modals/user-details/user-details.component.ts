import { Component, OnInit } from '@angular/core';
import { ModalController, IonButton, IonGrid, IonRow, IonCol, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  standalone: true,
  imports: [IonIcon, IonCol, IonRow, IonGrid, IonButton,],
})
export class UserDetailsComponent implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    console.log("user details");
  }

  close() {
    this.modalCtrl.dismiss()
  }








}
