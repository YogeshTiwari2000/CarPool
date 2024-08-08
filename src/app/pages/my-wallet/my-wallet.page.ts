import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import data from '../../../assets/dummy.json'
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonAvatar, IonCardSubtitle, IonCardTitle, IonCard, IonItem, IonText, IonLabel, IonIcon, IonCol, IonRow, IonGrid, IonList, IonImg, IonButton, ModalController, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { TopWithdrawPage } from '../top-withdraw/top-withdraw.page';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.page.html',
  styleUrls: ['./my-wallet.page.scss'],
  standalone: true,
  imports: [IonButtons, IonButton, IonImg, IonList, IonGrid, IonRow, IonCol, IonIcon, IonLabel, IonText, IonItem, IonCard, IonCardTitle, IonCardSubtitle, IonAvatar, IonCardHeader, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonMenuButton,]
})
export class MyWalletPage implements OnInit {

  userData: any;
  transactions: any[] = [];
  balance: number = 0;

  constructor(private router: Router, private modalCtrl: ModalController, private commonService: CommonService) {

    // console.log(data);
    // console.log("mydata === ", this.mydata);
  }

  mydata = data;
  currentUser: any = '';


  ngOnInit() {
    const currentUserEmail = this.commonService.currentUserEmail;

    const currentUserData: any = localStorage.getItem('currentUser');
    const parsedData: any = JSON.parse(currentUserData);

    this.currentUser = parsedData;
    // console.log(" this.currentUser === ", this.currentUser);
    // Find the user data for the current user
    // console.log("this.mydata.length === ", this.mydata.length);
    if (this.mydata.length > 0) {
      const userEntry: any = data.find((user: any) => user[currentUserEmail]);
      console.log(userEntry);

      if (userEntry) {
        this.userData = userEntry[currentUserEmail];
        const userWallet = this.userData.wallet;
        this.transactions = userWallet.transactions;
        this.balance = userWallet.balance;
      }

    }
  }
  goToWalletHistory() {
    this.router.navigate(['/wallet-history'])
  }

  topUp() {
    this.router.navigate(['/top-withdraw'],
      {
        state: {
          transactions: this.transactions,
          balance: this.balance
        }
      }

    )

  }

}

