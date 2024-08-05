import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTabs, IonTabBar, IonTabButton, IonIcon, IonButtons, IonMenuButton, IonBackButton, IonBreadcrumb, IonItem } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonItem, IonBreadcrumb, IonBackButton, IonButtons, IonIcon, IonMenuButton, IonTabButton, IonTabBar, IonTabs, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {

  constructor(private routes: Router) { }

  ngOnInit() {
    console.log("profile");
    this.routes.navigate(['profile/about']);
  }

}
