import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonCard, IonRow, IonCol, IonNav, IonIcon } from '@ionic/angular/standalone';

import { RideCardComponent } from 'src/app/components/ride-card/ride-card.component';
import { NavigationExtras, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HandleDataService } from 'src/app/services/data/handle-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonIcon, IonNav, IonCol, IonRow, IonCard, IonButton, IonButtons, IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RideCardComponent, RouterLink, RouterLinkActive]
})
export class HomePage implements OnInit {

  private handleData = inject(HandleDataService);
  private router = inject(Router);

  isLogeedIn: boolean = false;


  rideList: any;


  constructor() { }

  ngOnInit() {
    console.log("run");
    this.loadAllRides();
  }
  async loadAllRides() {
    await this.handleData.getData();
    this.rideList = this.handleData.getAllRideLists();
    console.log("this.rideLists ", this.rideList);
  }

  rideDetailView(index: number) {
    const selectedRide = this.rideList[index];
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ride: JSON.stringify(selectedRide)
      }
    };
    this.router.navigate(['/ride-detail-view'], navigationExtras);
  }
}
