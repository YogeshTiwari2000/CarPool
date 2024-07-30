import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonAvatar, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonIcon, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [IonLabel, IonIcon, IonItem, IonCardContent, IonCardSubtitle, IonCardTitle, IonAvatar, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AboutPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("about")
  }

}
