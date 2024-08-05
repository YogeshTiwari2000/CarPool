import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonCard, IonIcon, IonCardHeader, IonCardSubtitle, IonAvatar, IonCardTitle, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.page.html',
  styleUrls: ['./rating.page.scss'],
  standalone: true,
  imports: [IonButtons, IonCardTitle, IonAvatar, IonCardSubtitle, IonCardHeader, IonIcon, IonCard, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, RouterLink, RouterLinkActive]
})
export class RatingPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("rating");

  }

}
