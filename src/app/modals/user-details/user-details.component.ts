import { Component, OnInit } from '@angular/core';
import { ModalController, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  standalone: true,
  imports: [IonButton,],
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
