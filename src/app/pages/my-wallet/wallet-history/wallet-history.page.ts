import { Component, OnInit,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';


// import data from '../../../assets/dummy.json'
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonAvatar, IonCardSubtitle, IonCardTitle, IonCard, IonItem, IonText, IonLabel, IonIcon, IonCol, IonRow, IonGrid, IonList, IonImg, IonSearchbar, IonDatetimeButton, IonDatetime, IonModal, IonButtons,IonMenuButton, IonButton, IonPopover } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
type TransactionType = 'credit' | 'debit';

@Component({
  selector: 'app-my-wallet',
  templateUrl: './wallet-history.page.html',
  styleUrls: ['./wallet-history.page.scss'],
  standalone: true,
  imports: [IonPopover, IonButton, IonButtons, IonModal, IonDatetime, IonDatetimeButton, IonSearchbar, IonImg, IonList, IonGrid, IonRow, IonCol, IonIcon, IonLabel, IonText, IonItem, IonCard, IonCardTitle, IonCardSubtitle, IonAvatar, IonCardHeader, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink,IonMenuButton]
})

export class MyWalletPage implements OnInit {
  @ViewChild('modal', { static: true }) modal!: IonModal;
  lastSixTransaction!: { Name: string; Date: string; Amount: string; Type: string; }[];
  selectedDateTime: any;

  constructor(private router :Router , private cdr: ChangeDetectorRef) {
    // console.log(data);

  }
  selectedFromDateTime: string | null = null;
  selectedToDateTime: string | null = null;
  isModalOpen = false;
  original_data: any[] = []; // Assuming you have an original_data array


  onFilterButtonClicks() {
    this.isModalOpen = true;
  }

  onModalDismiss() {
    this.isModalOpen = false;
  }

  onDateTimeChanges(event: any) {
    console.log('Selected datetime value:', event.detail.value);
  }
  dummy_data = [
    {
      "id": "f2a7",
      "dewanshu.singh@paavu.com": {
        "profilePicture": "https://lh3.googleusercontent.com/a/ACg8ocIkgegYs_b9uOr78xy-AaQE9EPi3hYFubLchzJ2_F7Mw-LD70M=s96-c",
        "userEmail": "dewanshu.singh@paavu.com",
        "userName": "Dewanshu Singh",
        "password": "",
        "cpassword": "",
        "phone": "",
        "pickUpLocation": "",
        "dropLocation": "",
        "isSocialLogin": true,
        "email_verified": true,
       "wallet": {
          "transactions": [
            { "transaction": "Walmart", "date": "2024-08-06 12:32", "amount": "500", "type": "Deduction" },
            { "transaction": "Wallet Top up", "date": "2024-08-06 12:32", "amount": "1000", "type": "Addition" }
          ]
        }
      }
    },
    {
      "id": "8e52",
      "shubham.sholet@paavu.com": {
        "profilePicture": "https://lh3.googleusercontent.com/a/ACg8ocL13r6ZNdJKOi6XRnVuHCVIR6ozMda-5NEr8u2TgeiP-NpuLg=s96-c",
        "userEmail": "shubham.sholet@paavu.com",
        "userName": "Shubham Sholet",
        "password": "",
        "cpassword": "",
        "phone": "",
        "pickUpLocation": "",
        "dropLocation": "",
        "isSocialLogin": true,
        "email_verified": true,
        "wallet": {
          "transactions": [
            { "transaction": "Walmart", "date": "2024-08-06 12:32", "amount": "500", "type": "Deduction" },
            { "transaction": "Wallet Top up", "date": "2024-08-06 12:32", "amount": "1000", "type": "Addition" }
          ]
        }
      }
    },
    {
      "id": "35f1",
      "yogesh.tiwari@paavu.com": {
        "profilePicture": "https://lh3.googleusercontent.com/a/ACg8ocK-soA9fgCZmHQGvuHO_ZjoVDIOYNQ9Cnj-2ID34eo0TvwQCAI=s96-c",
        "userEmail": "yogesh.tiwari@paavu.com",
        "userName": "Yogesh Tiwari",
        "password": "",
        "cpassword": "",
        "phone": "",
        "pickUpLocation": "",
        "dropLocation": "",
        "isSocialLogin": true,
        "email_verified": true,
        "wallet": {
          "transactions": [
            { "transaction": "Walmart", "date": "2024-08-06 12:32", "amount": "500", "type": "Deduction" },
            { "transaction": "Wallet Top up", "date": "2024-08-06 12:32", "amount": "1000", "type": "Addition" }
          ]
        }
      }
    },
    {
      "id": "abdf",
      "yogi.baba@baba.com": {
        "profilePicture": "",
        "userEmail": "yogi.baba@baba.com",
        "userName": "yogi",
        "password": "baba.com",
        "cpassword": "12420Y",
        "phone": "9582467932",
        "pickUpLocation": "",
        "dropLocation": "",
        "isSocialLogin": false,
        "email_verified": false,
        "wallet": {
          "transactions": [
            { "transaction": "Walmart", "date": "2024-08-06 12:32", "amount": "500", "type": "Deduction" },
            { "transaction": "Wallet Top up", "date": "2024-08-06 12:32", "amount": "1000", "type": "Addition" }
          ]
        }
      }
    },
    {
      "id": "b8fb",
      "nikita.shukla@paavu.com": {
        "profilePicture": "https://lh3.googleusercontent.com/a/ACg8ocKnsPBYCSXMz8f56NCKg1uRUhVdm8sqBxjF9cfWimKfENOtrw=s96-c",
        "userEmail": "nikita.shukla@paavu.com",
        "userName": "Nikita Shukla",
        "password": "",
        "cpassword": "",
        "phone": "",
        "pickUpLocation": "",
        "dropLocation": "",
        "isSocialLogin": true,
        "email_verified": true
      }
    },
    {
      "id": "5916",
      "dewanshu.singh@paavu.com": {
        "profilePicture": "https://lh3.googleusercontent.com/a/ACg8ocIkgegYs_b9uOr78xy-AaQE9EPi3hYFubLchzJ2_F7Mw-LD70M=s96-c",
        "userEmail": "dewanshu.singh@paavu.com",
        "userName": "Dewanshu Singh",
        "password": "",
        "cpassword": "",
        "phone": "1234536757",
        "pickUpLocation": "",
        "dropLocation": "",
        "isSocialLogin": true,
        "email_verified": true,
        "wallet": {
          "transactions": [
            { "transaction": "Walmart", "date": "2024-08-06 12:32", "amount": "500", "type": "Deduction" },
            { "transaction": "Wallet Top up", "date": "2024-08-06 12:32", "amount": "1000", "type": "Addition" }
          ]
        }
      }
    },
    {
      "id": "7037",
      "dewanshu.singh@paavu.com": {
        "profilePicture": "https://lh3.googleusercontent.com/a/ACg8ocIkgegYs_b9uOr78xy-AaQE9EPi3hYFubLchzJ2_F7Mw-LD70M=s96-c",
        "userEmail": "dewanshu.singh@paavu.com",
        "userName": "Dewanshu Singh",
        "password": "",
        "cpassword": "",
        "phone": "2341234123",
        "pickUpLocation": "",
        "dropLocation": "",
        "isSocialLogin": true,
        "email_verified": true,
        "wallet": {
          "transactions": [
            { "transaction": "Walmart", "date": "2024-08-06 12:32", "amount": "500", "type": "Deduction" },
            { "transaction": "Wallet Top up", "date": "2024-08-06 12:32", "amount": "1000", "type": "Addition" }
          ]
        }
      }
    },
    {
      "id": "c239",
      "dewanshu.singh@paavu.com": {
        "profilePicture": "https://lh3.googleusercontent.com/a/ACg8ocIkgegYs_b9uOr78xy-AaQE9EPi3hYFubLchzJ2_F7Mw-LD70M=s96-c",
        "userEmail": "dewanshu.singh@paavu.com",
        "userName": "Dewanshu Singh",
        "password": "",
        "cpassword": "",
        "phone": "",
        "pickUpLocation": "",
        "dropLocation": "",
        "isSocialLogin": true,
        "email_verified": true,
        "wallet": {
          "transactions": [
            { "transaction": "Walmart", "date": "2024-08-06 12:32", "amount": "500", "type": "Deduction" },
            { "transaction": "Wallet Top up", "date": "2024-08-06 12:32", "amount": "1000", "type": "Addition" }
          ]
        }
      }
    }
  ]
  ngOnInit() {
    console.log("wallet");

    // this.lastSixTransaction = [
    //   {
    //     "Name": "Walmart",
    //     "Date": "2024-08-06 12:32",
    //     "Amount": "500",
    //     "Type": "Deduction"
    //   },
    //   {
    //     "Name": "Wallet Top up",
    //     "Date": "2024-08-06 12:32",
    //     "Amount": "1000",
    //     "Type": "Addition"
    //   },
    //   {
    //     "Name": "Refund From Netflix",
    //     "Date": "2024-08-06 12:32",
    //     "Amount": "20.20",
    //     "Type": "Addition"
    //   },
    //   {
    //     "Name": "Netflix Recharge",
    //     "Date": "2024-08-06 12:32",
    //     "Amount": "40",
    //     "Type": "Deduction"
    //   },
    //   {
    //     "Name": "Amazon",
    //     "Date": "2024-08-06 12:32",
    //     "Amount": "35.23",
    //     "Type": "Deduction"
    //   },
    //   {
    //     "Name": "Wallet Top Up",
    //     "Date": "2024-08-06 12:32",
    //     "Amount": "1000",
    //     "Type": "Addition"
    //   }
    // ]

  }
  filtered_data = [...this.dummy_data];
  goToWalletHistory(){
    this.router.navigate(['/wallet-history'])
  }
  getUserInfo(item: any) {
    const emailKey = Object.keys(item).find(key => key.includes('@'));
    if (emailKey) {
      return item[emailKey] || { wallet: { transactions: [] } }; // Default to an object with empty transactions
    }
    return { wallet: { transactions: [] } }; // Default to an object with empty transactions
  }
  filterData(event: any) {
    const searchTerm = event.target.value.toLowerCase();
  
    if (!searchTerm) {
      this.filtered_data = this.dummy_data;
      return;
    }
  
    this.filtered_data = this.dummy_data.filter(item => {
      const userInfo = this.getUserInfo(item);
      return (
        userInfo.userName?.toLowerCase().includes(searchTerm) ||
        userInfo.userEmail?.toLowerCase().includes(searchTerm)
      );
    });
  }
  onFilterButtonClick(){
    this.filtered_data = this.dummy_data;

  }
  onFromDateTimeChange(event: any) {
    this.selectedFromDateTime = event.detail.value;
  }

  onToDateTimeChange(event: any) {
    this.selectedToDateTime = event.detail.value;
  }
  




// Filter method in the component class
filterByType(type: 'credit' | 'debit') {
  const transactionType = type === 'credit' ? 'Addition' : 'Deduction';

  this.filtered_data = this.dummy_data.filter(user => {
    const transactions = this.getUserInfo(user)?.wallet?.transactions || [];
    return transactions.some((transaction: { type: string; }) => transaction.type === transactionType);
  });

  console.log('Filtered Data:', this.filtered_data); // Check if data is filtered correctly
  this.cdr.detectChanges(); // Trigger change detection
}


  
  @ViewChild('datetime', { static: true }) datetime?: IonDatetime;

  onDateTimeChange(event: any) {
    console.log('Selected datetime value:', event.detail.value);
  }
  
}
