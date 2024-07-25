import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton } from '@ionic/angular/standalone';

import { UserCardComponent } from 'src/app/components/user-card/user-card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonButton, IonButtons, IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, UserCardComponent]
})
export class HomePage implements OnInit {
  isLogeedIn: boolean = false;
  usersList: any = [
    {
      name: 'test1', designation: 'dg1', age: '21', profilePic: 'https://ionicframework.com/docs/img/demos/avatar.svg', rating: '1', journeyStart: '2:00', journeyEnd: '4:00', source: 's1',
      destination: 'd1', price: '100', seatAvl: '1',
    },
    {
      name: 'test2', designation: 'dg2', age: '22', profilePic: 'https://ionicframework.com/docs/img/demos/avatar.svg', rating: '2', journeyStart: '3:00', journeyEnd: '5:00', source: 's2',
      destination: 'd2', price: '200', seatAvl: '2',
    },
    {
      name: 'test3', designation: 'dg3', age: '43', profilePic: 'https://ionicframework.com/docs/img/demos/avatar.svg', rating: '3', journeyStart: '14:00', journeyEnd: '18:00', source: 's3',
      destination: 'd3', price: '300', seatAvl: '3',
    },
    {
      name: 'test4', designation: 'dg4', age: '34', profilePic: 'https://ionicframework.com/docs/img/demos/avatar.svg', rating: '4', journeyStart: '17:00', journeyEnd: '22:00', source: 's4',
      destination: 'd4', price: '400', seatAvl: '4',
    },
  ];


  constructor() { }

  ngOnInit() {
    console.log("run");
  }



}
