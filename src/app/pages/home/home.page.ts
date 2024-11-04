import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonCard, IonRow, IonCol, IonNav, IonIcon, IonBackButton } from '@ionic/angular/standalone';

import { RideCardComponent } from 'src/app/components/ride-card/ride-card.component';
import { NavigationExtras, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HandleDataService } from 'src/app/services/data/handle-data.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonIcon, IonNav, IonCol, IonRow, IonCard, IonButton, IonButtons, IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RideCardComponent, RouterLink, RouterLinkActive]
})
export class HomePage implements OnInit {

  private handleData = inject(HandleDataService);
  private LocalStr = inject(LocalStorageService);
  private commonService = inject(CommonService);
  private router = inject(Router);

  isLogeedIn: boolean = false;

  filteredRides: any[] = [];
  rideList: any;
  currentUserDocId: any;
  searchData: any;


  constructor() { }

  ngOnInit() {
    this.currentUserDocId = this.LocalStr.getItem("currentUserDocId");
    this.loadAllRides();
    console.log("filteredRides === ", this.filteredRides);
  }
  async loadAllRides() {
    // await this.handleData.getData();
    // this.rideList = this.handleData.getAllRideLists();
    // console.log("this.rideLists ", this.rideList);

    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      if (navigation.extras.state['filteredRides']) {
        this.filteredRides = navigation.extras.state['filteredRides'];
        console.log('Filtered Rides:', this.filteredRides);
      }

      if (navigation.extras.state['searchData']) {
        this.searchData = navigation.extras.state['searchData'];
        // console.log('Search Data:', this.searchData);
      }
    } else {
      console.log('No filtered rides or search data found.');
    }
  }

  rideDetailView(index: number) {
    if (this.currentUserDocId != undefined) {
      const selectedRide = this.filteredRides[index];
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ride: JSON.stringify(selectedRide)
        }
      };
      this.router.navigate(['/ride-detail-view'], navigationExtras);
    }
    else {
      this.commonService.alertBox(
        "Please Login First to check the details",
        "Login error.",
        ["Ok"]
      );
      return;
    }
  }
}
