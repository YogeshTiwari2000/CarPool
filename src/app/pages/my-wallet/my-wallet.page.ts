import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import data from '../../../assets/dummy.json'
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonAvatar, IonCardSubtitle, IonCardTitle, IonCard, IonItem, IonText, IonLabel, IonIcon, IonCol, IonRow, IonGrid, IonList, IonImg, IonButton, ModalController, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { TopWithdrawPage } from '../top-withdraw/top-withdraw.page';
import { CommonService } from 'src/app/shared/common.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { HandleDataService } from 'src/app/services/data/handle-data.service';

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
  userDataLength: any;
  wallet: any = {
    balance: 10,
    // currency: "Rs",
    // transactions: [
    //   {
    //     id: "",
    //     date: "",
    //     amount: 0,
    //     type: "",
    //     description: "",
    //     status: "",
    //     paymentMethod: "",
    //     category: ""
    //   }
    // ],
    // withdrawals: [
    //   {
    //     id: "",
    //     date: "",
    //     amount: 0,
    //     method: "",
    //     status: "",
    //     description: ""
    //   }
    // ],
    // linkedCards: [
    //   {
    //     cardNumber: "",
    //     cardType: "",
    //     expiryDate: "",
    //     issuer: "",
    //     balance: 0,
    //     currency: "Rs"
    //   }
    // ]
  }

  constructor(private router: Router, private modalCtrl: ModalController, private commonService: CommonService,
    public localStr: LocalStorageService, private handleData: HandleDataService) {

  }

  // mydata = data;
  currentUser: any = '';

  ngOnInit() {
    const currentUserEmail = this.commonService.currentUserEmail;


    // Retrieve data from Firebase and store it in local storage
    this.handleData.userExists(currentUserEmail).then((res) => {
      console.log("res.data === ", res.data);

      // Store the retrieved data in local storage
      this.localStr.setItem("currentUser", res.data);

      // Update the wallet data
      this.currentUser = this.localStr.getItem("currentUser");

      if (this.currentUser) {
        this.userData = this.currentUser;

        const length = Object.keys(this.currentUser).length;
        console.log('currentUser length: ', length);

        this.userDataLength = length

        console.log('currentUser: ', this.currentUser);


        // Update wallet balance and transactions
        this.userData.wallet.balance = this.wallet.balance;
        console.log("this.userData.wallet === ", this.userData.wallet);
        // this.transactions = this.userData.wallet.transactions;
        // this.balance = this.wallet.balance;

        console.log("Updated Wallet Data: ", this.wallet);
        this.balance = this.wallet.balance
        console.log("balance === ", this.balance);
      } else {
        console.error("Error: currentUser data not found in local storage.");
      }
    }).catch((error) => {
      console.error("Error: ", error);
    });
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

// const currentUserData = this.localStr.getItem('currentUser')

// this.currentUser = currentUserData;
// console.log("this.currentUser === ", this.currentUser);

// this.walletData = this.currentUser.wallet;

// console.log(" this.walletData === ", this.walletData);
// console.log(" this.currentUser === ", this.currentUser);
// console.log(" this.currentUser === ", this.currentUser);
// Find the user data for the current user
// console.log("this.mydata.length === ", this.mydata.length);