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

  wallet: any = {
    balance: 0,
    currency: "Rs",
    transactions: [
      {
        id: "",
        date: "",
        amount: 0,
        type: "",
        description: "",
        status: "",
        paymentMethod: "",
        category: ""
      }
    ],
    withdrawals: [
      {
        id: "",
        date: "",
        amount: 0,
        method: "",
        status: "",
        description: ""
      }
    ],
    linkedCards: [
      {
        cardNumber: "",
        cardType: "",
        expiryDate: "",
        issuer: "",
        balance: 0,
        currency: "Rs"
      }
    ]
  }

  constructor(private router: Router, private modalCtrl: ModalController, private commonService: CommonService,
    public localStr: LocalStorageService, private handleData: HandleDataService) {

    // console.log(data);
    // console.log("mydata === ", this.mydata);
  }

  // mydata = data;
  currentUser: any = '';
  walletData: any = '';


  ngOnInit() {
    const currentUserEmail = this.commonService.currentUserEmail;
    this.handleData.userExists(currentUserEmail).then((res) => {
      this.localStr.setItem("currentUser", res.data)
    })


    // const currentUserData = this.localStr.getItem('currentUser')

    // this.currentUser = currentUserData;
    // console.log("this.currentUser === ", this.currentUser);

    // this.walletData = this.currentUser.wallet;

    // console.log(" this.walletData === ", this.walletData);
    // console.log(" this.currentUser === ", this.currentUser);
    // console.log(" this.currentUser === ", this.currentUser);
    // Find the user data for the current user
    // console.log("this.mydata.length === ", this.mydata.length);
    if (this.currentUser.length > 0) {
      const userEntry: any = this.currentUser.find((user: any) => user[currentUserEmail]);
      console.log(userEntry);

      if (userEntry) {
        this.userData = userEntry[currentUserEmail];
        console.log("this is userData : ", this.userData);

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

