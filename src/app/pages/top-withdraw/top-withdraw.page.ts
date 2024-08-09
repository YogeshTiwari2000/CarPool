import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonIcon, ModalController, IonBackButton, IonAvatar, IonGrid, IonRow, IonCol, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonLabel, IonCardContent, IonItem, IonInput, IonToggle, IonNote, IonList, IonListHeader, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-top-withdraw',
  templateUrl: './top-withdraw.page.html',
  styleUrls: ['./top-withdraw.page.scss'],
  standalone: true,
  imports: [IonText, IonListHeader, IonList, IonNote, IonToggle, IonInput, IonItem, IonCardContent, IonLabel, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, IonButton, IonCol, IonRow, IonGrid, IonAvatar, IonBackButton, IonIcon, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton, RouterLink]
})
export class TopWithdrawPage implements OnInit {

  transaction_data: any = [];
  balance: number = 0;
  amountToAdd: number = 0

  constructor(private router: Router) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.balance = navigation?.extras?.state['balance'] || 0;
      this.transaction_data = navigation?.extras.state['transactions'] || [];
    }
    console.log("Balance data is : ", this.balance);
    console.log("Transaction_data is : ", this.transaction_data);
  }

  addMoney() {
    if (this.amountToAdd > 0) {
      this.balance += this.amountToAdd;
      this.amountToAdd = 0
    } else {
      console.error("Invalid Amount Entered");
    }
  }
  goToWalletHistory() {
    this.router.navigate(['/wallet-history'])
  }
  // close() {
  //   this.modalCtrl.dismiss()
  // }
  "wallet": {
    "balance": 0,
    "currency": "Rs",
    "transactions": [
      {
        "id": "",
        "date": "",
        "amount": 0,
        "type": "",
        "description": "",
        "status": "",
        "paymentMethod": "",
        "category": ""
      },

    ],
    "withdrawals": [
      {
        "id": "",
        "date": "",
        "amount": 0,
        "method": "",
        "status": "",
        "description": ""
      }
    ],
    "linkedCards": [
      {
        "cardNumber": "",
        "cardType": "",
        "expiryDate": "",
        "issuer": "",
        "balance": 0,
        "currency": "Rs"
      }
    ]
  }

}
