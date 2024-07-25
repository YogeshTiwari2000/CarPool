import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonCol, IonInput, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.page.html',
  styleUrls: ['./search-screen.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonCol, IonRow, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SearchScreenPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("search page");
    
  }

}
