import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonRow, IonCol, IonCardContent, IonAvatar, IonItem, IonBadge, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-my-update',
  templateUrl: './my-update.page.html',
  styleUrls: ['./my-update.page.scss'],
  standalone: true,
  imports: [IonLabel, IonBadge, IonItem, IonAvatar, IonCardContent, IonCol, IonRow, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MyUpdatePage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log();

  }
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
}
