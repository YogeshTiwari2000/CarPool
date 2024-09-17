import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, ModalController, ToastController, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { LoginComponent } from 'src/app/modals/login/login.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HandleDataService } from 'src/app/services/data/handle-data.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { CommonService } from 'src/app/shared/common.service';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [IonButtons, IonMenuButton, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, RouterLinkActive,]
})
export class WelcomePage implements OnInit {
  public modalCtl = inject(ModalController)
  private handleData = inject(HandleDataService);
  localStorageService = inject(LocalStorageService);
  commonService = inject(CommonService);
  routes = inject(Router);
  toastController = inject(ToastController);
  private firestore: Firestore = inject(Firestore);
  currentUserData: any;
  isLoggedIn: boolean = false;

  constructor() {

  }

  users: any[] = [];
  subscription: Subscription | undefined;

  // ngOnInit() {
  //   console.log("welcome page");

  //   this.subscription = this.handleData.subscribeToAllRideLists("vkOkXi5KrdBHdhDJ8IjZ").subscribe((data) => {
  //     console.log("Changes detected:", data);
  //     this.users = data;
  //     this.onNodesChanged(data);  // Trigger a function when nodes change

  //     this.sendNotification()
  //   });

  // }



  previousData: any = null;  // Store the previous state

  ngOnInit() {
    // Subscribe to ride list changes
    // this.subscription = this.handleData.subscribeToAllRideLists("vkOkXi5KrdBHdhDJ8IjZ").subscribe((data) => {
    //   console.log("Changes detected:", data);
    //   console.log('ye bhi na chl rha');


    //   if (this.previousData) {
    //     // Detect changes in the rideList field (or any other field you want to track)
    //     data.forEach((userData: any, index: number) => {
    //       const prevUserData = this.previousData[index];

    //       // Check if rideList has changed
    //       const prevRideList = prevUserData?.ride?.rideList || [];
    //       const currentRideList = userData?.ride?.rideList || [];

    //       if (JSON.stringify(prevRideList) !== JSON.stringify(currentRideList)) {
    //         console.log(`Changes detected in rideList for user: ${userData.id}`);
    //         console.log("Previous rideList:", prevRideList);
    //         console.log("Current rideList:", currentRideList);

    //         // You can also determine the added/removed rides if needed
    //         const addedRides = currentRideList.filter((ride: any) => !prevRideList.includes(ride));
    //         const removedRides = prevRideList.filter((ride: any) => !currentRideList.includes(ride));

    //         console.log("Added rides:", addedRides);
    //         console.log("Removed rides:", removedRides);
    //       }
    //     });
    //   }

    //   // Store the current data as the previous state for future comparisons
    //   this.previousData = data;

    //   // Update the users and trigger any further actions
    //   this.users = data;
    //   this.onNodesChanged(data);

    //   // Send a notification if needed
    //   this.sendNotification();
    // });
  }













  ionViewWillEnter() {
    const currentUserEmail = this.commonService.currentUserEmail;
    console.log("currentUserEmail === ", currentUserEmail);
    this.handleData.userExists(currentUserEmail).then((res) => {
      this.currentUserData = res.data;
      console.log(" this.currentUserData === ", this.currentUserData);
      this.isLoggedIn = this.currentUserData ? true : false; // Set isLoggedIn based on user existence 
      console.log(" this.isLoggedIn === ", this.isLoggedIn);

    });
  }

  // onNodesChanged(data: any[]): void {
  //   // Do something with the updated nodes
  //   console.log("Updated node data:", data);
  // }

  async reqRide() {
    if (this.isLoggedIn) {
      this.routes.navigate(['/create-ride'])
    }
    else {
      const toast = await this.toastController.create({
        message: 'login before request a ride',
        duration: 1500,
        position: 'bottom',
      });

      await toast.present();
    }
  }

  async loginModal() {
    const modal = await this.modalCtl.create({
      component: LoginComponent,
    })
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    console.log("data", data, role);

  }




  async sendNotification() {
    this.commonService.sendNotification('carpool', 'his is the only one notification that exist yet', '/profile', "hero notification check", "aagi");
  };


}


