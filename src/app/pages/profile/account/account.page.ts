import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonCardHeader, IonCard, IonList } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [IonList, IonCard, IonCardHeader, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,]
})
export class AccountPage implements OnInit {
  public router = inject(Router)

  constructor() { }

  ngOnInit() {
    console.log("account");

  }

  navTo(route: string) {
    this.router.navigate([`profile/${route}`])
  }

}
