import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonCard, IonRow, IonCol, IonNav, IonIcon } from '@ionic/angular/standalone';

import { RideCardComponent } from 'src/app/components/ride-card/ride-card.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
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

  isLogeedIn: boolean = false;

  usersList: any = [
    {
      name: 'test1', designation: 'dg1', age: '21', profilePic: 'https://ionicframework.com/docs/img/demos/avatar.svg', rating: '1', date: '26/07/2024', journeyStart: '2:40', journeyEnd: '14:00', source: 's1',
      destination: 'd1', price: '100', seatAvl: '1',
    },
    {
      name: 'test2', designation: 'dg2', age: '22', profilePic: 'https://ionicframework.com/docs/img/demos/avatar.svg', rating: '2', date: '24/07/2024', journeyStart: '3:25', journeyEnd: '5:00', source: 's2',
      destination: 'd2', price: '200', seatAvl: '2',
    },
    {
      name: 'test3', designation: 'dg3', age: '43', profilePic: 'https://ionicframework.com/docs/img/demos/avatar.svg', rating: '3', date: '23/07/2024', journeyStart: '14:00', journeyEnd: '18:40', source: 's3',
      destination: 'd3', price: '300', seatAvl: '3',
    },
    {
      name: 'test4', designation: 'dg4', age: '34', profilePic: 'https://ionicframework.com/docs/img/demos/avatar.svg', rating: '4', date: '21/07/2024', journeyStart: '17:00', journeyEnd: '22:00', source: 's4',
      destination: 'd4', price: '400', seatAvl: '4',
    },
  ];
  rideLists: any;


  constructor() { }

  ngOnInit() {
    console.log("run");
    this.loadAllRides();
  }
  async loadAllRides() {
    console.log("loadAllRides === 11");
    await this.handleData.getData();
    this.rideLists = this.handleData.getAllRideLists();
    console.log("this.rideLists ", this.rideLists);
  }


}
