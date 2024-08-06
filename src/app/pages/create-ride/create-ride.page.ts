import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow } from '@ionic/angular/standalone';

@Component({
  selector: 'app-create-ride',
  templateUrl: './create-ride.page.html',
  styleUrls: ['./create-ride.page.scss'],
  standalone: true,
  imports: [IonRow, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CreateRidePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
