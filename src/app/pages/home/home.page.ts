import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton } from '@ionic/angular/standalone';

import { UserCardComponent } from 'src/app/components/user-card/user-card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonButton, IonButtons, IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, UserCardComponent]
})
export class HomePage implements OnInit {
  isLogeedIn: boolean = false;
  userData: any = [1, 2, 3, 4, 5, 6, 7, 8, 9];


  constructor() { }

  ngOnInit() {
    console.log("run");
  }



}
