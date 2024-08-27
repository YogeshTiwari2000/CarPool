import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCol, IonRow, IonButton, IonLabel, IonItem, IonIcon, IonButtons, IonMenuButton, IonTabButton, ModalController, IonModal, IonList } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { HandleDataService } from 'src/app/services/data/handle-data.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { CommonService } from 'src/app/shared/common.service';
import { EditRideComponent } from 'src/app/modals/edit-ride/edit-ride.component';

@Component({
  selector: 'app-ride-detail-view',
  templateUrl: './ride-detail-view.page.html',
  styleUrls: ['./ride-detail-view.page.scss'],
  standalone: true,
  imports: [IonList, IonModal, IonTabButton, IonButtons, IonIcon, IonItem, IonLabel, IonButton, IonRow, IonCol, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton]
})
export class RideDetailViewPage implements OnInit {


  private handleData = inject(HandleDataService);
  localStorageService = inject(LocalStorageService);
  commonService = inject(CommonService);
  modalCtrl = inject(ModalController);


  ride: any;
  email: any;
  currentUser: any;
  isEmailVerified: boolean = false;
  isPhoneVerified: boolean = false;
  status: any = 'requested';
  currentUserDocId: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['ride']) {
        this.ride = JSON.parse(params['ride']);
        console.log('Ride Data:', this.ride);
        this.email = this.ride.riderEmail
        console.log("this.email === ", this.email);
      }
    });
    this.handleData
      .userExists(this.email)
      .then((result) => {
        if (result.isExist) {
          this.handleData.user = result.data;
          this.currentUser = this.handleData.user;
          this.currentUserDocId = this.localStorageService.getItem("currentUserDocId");
          console.log("currentUser === ", this.currentUser);
          this.isEmailVerified = this.currentUser.email_verified
          console.log(" this.isEmailVerified === ", this.isEmailVerified);
        } else {
          console.log("User not found");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  ionViewWillEnter() { }

  async editRide() {
    const modal = await this.modalCtrl.create({
      component: EditRideComponent,
      cssClass: ["editRideModalCss",],
      componentProps: { currentRideData: this.ride }
    })
    modal.present();
  }




  cancelRide() {
    const userRideList = this.currentUser.ride.rideList
    const currentRideId = this.ride.id
    const matchedRide = userRideList.find((ride: { id: string; }) => ride.id === currentRideId);
    if (matchedRide) {
      matchedRide.status = 'canceled'
      console.log(" matchedRide.status === ", matchedRide.status);
      this.handleData.updateDocumentField(this.currentUserDocId, 'ride', this.currentUser.ride)
    } else {
      console.log('not able to cancel the ride');
    }
    this.modalCtrl.dismiss();
  }
}
