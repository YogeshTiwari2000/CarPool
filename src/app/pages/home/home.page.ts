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
  usersList: any = [{ name: 'test1', source: 's1', rating: 4.3, verify: 'true' }, { name: 'test2', source: 's2', rating: 3, verify: 'true' }, { name: 'test3', source: 's3', rating: 3.5, verify: 'true' }];


  constructor() { }

  ngOnInit() {
    console.log("run");
  }



}
