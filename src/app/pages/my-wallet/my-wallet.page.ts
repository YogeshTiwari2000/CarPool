import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonAvatar, IonCardSubtitle, IonCardTitle, IonCard, IonItem, IonText, IonLabel, IonIcon, IonCol, IonRow, IonGrid, IonList } from '@ionic/angular/standalone';

@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.page.html',
  styleUrls: ['./my-wallet.page.scss'],
  standalone: true,
  imports: [IonList, IonGrid, IonRow, IonCol, IonIcon, IonLabel, IonText, IonItem, IonCard, IonCardTitle, IonCardSubtitle, IonAvatar, IonCardHeader, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MyWalletPage implements OnInit {

  constructor() { }
  lastSixTransaction:any;
  totalAmount:any="10,500";
  ngOnInit() {
    console.log("wallet");
    
    this.lastSixTransaction = [
      {
      "Name":"Walmart",
      "Date":"2024-08-06 12:32",
      "Amount" :"500",
      "Type":"Deduction"
    },
    {
      "Name":"Wallet Top up",
      "Date":"2024-08-06 12:32",
      "Amount" :"1000",
      "Type":"Addition"
    },
    {
      "Name":"Refund From Netflix",
      "Date":"2024-08-06 12:32",
      "Amount" :"20.20",
      "Type":"Addition"
    },
    {
      "Name":"Netflix Recharge",
      "Date":"2024-08-06 12:32",
      "Amount" :"40",
      "Type":"Deduction"
    },
    {
      "Name":"Amazon",
      "Date":"2024-08-06 12:32",
      "Amount" :"35.23",
      "Type":"Deduction"
    },
    {
      "Name":"Wallet Top Up",
      "Date":"2024-08-06 12:32",
      "Amount" :"1000",
      "Type":"Addition"
    }
  ]

  }

}
