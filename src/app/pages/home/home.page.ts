import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, ModalController } from '@ionic/angular/standalone';
import { UserDetailsComponent } from 'src/app/modals/user-details/user-details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonButton, IonButtons, IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomePage implements OnInit {
  isLogeedIn: boolean = false;
  userData: any = [1, 2, 3, 4, 5, 6, 7, 8, 9];


  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    console.log("run");
  }


  async userDetailModal(event: any) {
    console.log("clicked");
    const modal = await this.modalCtrl.create({
      component: UserDetailsComponent
    })


    modal.present()
  }
}
