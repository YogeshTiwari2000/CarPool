import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import data from '../../../assets/dummy.json'
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonAvatar, IonCardSubtitle, IonCardTitle, IonCard, IonItem, IonText, IonLabel, IonIcon, IonCol, IonRow, IonGrid, IonList, IonImg, IonButton, ModalController } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { TopWithdrawComponent } from 'src/app/components/top-withdraw/top-withdraw.component';

@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.page.html',
  styleUrls: ['./my-wallet.page.scss'],
  standalone: true,
  imports: [IonButton, IonImg, IonList, IonGrid, IonRow, IonCol, IonIcon, IonLabel, IonText, IonItem, IonCard, IonCardTitle, IonCardSubtitle, IonAvatar, IonCardHeader, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class MyWalletPage implements OnInit {

  userData: any;
  transactions: any[] = [];
  balance: number = 0;

  constructor(private router: Router, private modalCtrl: ModalController) {
    console.log(data);
    console.log("mydata === ", this.mydata);
  }

  mydata = data;
  currentUser: any = '';


  ngOnInit() {
    const currentUserEmail = 'yogesh.tiwari@paavu.com'; // Replace with actual logic

    const currentUserData: any = localStorage.getItem('currentUser');
    const parsedData: any = JSON.parse(currentUserData);
    console.log(parsedData);

    this.currentUser = parsedData;

    // Find the user data for the current user
    if (this.mydata.length > 0) {
      const userEntry = data.find((user: any) => user[currentUserEmail]);
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

  async topUp() {
    console.log("clicked");
    const modal = await this.modalCtrl.create({
      component: TopWithdrawComponent,
    })

    modal.present()
  }

}
