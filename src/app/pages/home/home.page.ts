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

  filteredRides: any[] = [];
  rideList: any;


  constructor() { }

  ngOnInit() {

    console.log("run");
    this.loadAllRides();
  }
  async loadAllRides() {
    // await this.handleData.getData();
    // this.rideList = this.handleData.getAllRideLists();
    // console.log("this.rideLists ", this.rideList);

    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state && navigation.extras.state['filteredRides']) {
      this.filteredRides = navigation.extras.state['filteredRides'];
      console.log('Filtered Rides:', this.filteredRides);
    } else {
      console.log('No filtered rides data found.');
    }
  }

  rideDetailView(index: number) {
    const selectedRide = this.filteredRides[index];
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ride: JSON.stringify(selectedRide)
      }
    };
    this.router.navigate(['/ride-detail-view'], navigationExtras);
  }
}
