import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonIcon, ModalController, IonBackButton, IonAvatar, IonGrid, IonRow, IonCol, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonLabel, IonCardContent, IonItem, IonInput, IonToggle, IonNote, IonList, IonListHeader, IonText } from '@ionic/angular/standalone';
import { HandleDataService } from 'src/app/services/data/handle-data.service';
import { CommonService } from 'src/app/shared/common.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Component({
  selector: 'app-top-withdraw',
  templateUrl: './top-withdraw.page.html',
  styleUrls: ['./top-withdraw.page.scss'],
  standalone: true,
  imports: [IonText, IonListHeader, IonList, IonNote, IonToggle, IonInput, IonItem, IonCardContent, IonLabel, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, IonButton, IonCol, IonRow, IonGrid, IonAvatar, IonBackButton, IonIcon, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton, RouterLink]
})
export class TopWithdrawPage implements OnInit {

  private handleData = inject(HandleDataService);
  localStorageService = inject(LocalStorageService);
  commonService = inject(CommonService);

  email: any = this.commonService.currentUserEmail;
  users: any[] = [];
  userdata: any;
  transaction_data: any = [];
  amountToAdd: number = 0;

  userBalance: any;

  walletDetails = {
    balance: 0,
    transactions: {
      id: "",
      date: "",
      amount: 0,
      type: "",
      status: "",
      paidTo: "",
    },
    transactionsList: [] as { id: string; date: string; amount: number; type: string; status: string; paidTo: string; }[]
  };



  constructor(private router: Router) { }

  ngOnInit() { }
  ionViewWillEnter() {
    const currentUserDocId = this.localStorageService.getItem("currentUserDocId");
    console.log("currentUserDocId === ", currentUserDocId);
    this.handleData
      .userExists(this.email)
      .then((result) => {
        if (result.isExist) {
          this.handleData.user = result.data;
          console.log("User data:", result.data);
          this.userdata = result.data
          this.userBalance = this.userdata.wallet.balance
          console.log("  this.userdet === ", this.userdata);
        } else {
          console.log("User not found");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  @Output() updatedBalance = new EventEmitter<string>();
  addMoney() {



    if (this.amountToAdd > 0) {
      const currentUserDocId = this.localStorageService.getItem("currentUserDocId");
      this.userBalance += this.amountToAdd;
      this.walletDetails.balance = this.userBalance;
      this.walletDetails.transactions.id = Math.random().toString();
      this.walletDetails.transactions.paidTo = this.userdata.userName
      this.walletDetails.transactions.amount = this.amountToAdd
      this.walletDetails.transactions.date = (new Date()).toString()
      this.walletDetails.transactions.status = 'recieve'
      this.walletDetails.transactions.type = 'credit'
      // Make the transactions object immutable
      const immutableTransaction = Object.freeze({ ...this.walletDetails.transactions });

      // Push the immutable object into the transactionsList
      this.walletDetails.transactionsList.push(immutableTransaction);

      // this.walletDetails.transactionsList.push(this.walletDetails.transactions);
      this.handleData.updateDocumentField(currentUserDocId, 'wallet', this.walletDetails)

      this.amountToAdd = 0;


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


}

