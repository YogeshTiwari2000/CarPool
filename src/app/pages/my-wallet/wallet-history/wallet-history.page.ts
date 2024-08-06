import { Component, OnInit,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonModal } from '@ionic/angular';

// import data from '../../../assets/dummy.json'
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonAvatar, IonCardSubtitle, IonCardTitle, IonCard, IonItem, IonText, IonLabel, IonIcon, IonCol, IonRow, IonGrid, IonList, IonImg, IonSearchbar } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-wallet',
  templateUrl: './wallet-history.page.html',
  styleUrls: ['./wallet-history.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonImg, IonList, IonGrid, IonRow, IonCol, IonIcon, IonLabel, IonText, IonItem, IonCard, IonCardTitle, IonCardSubtitle, IonAvatar, IonCardHeader, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,RouterLink]
})
export class MyWalletPage implements OnInit {
  @ViewChild('modal', { static: true }) modal!: IonModal;
  constructor(private router :Router) {
    // console.log(data);

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
        "email_verified": true
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
        "email_verified": true
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
        "email_verified": false
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
        "email_verified": true
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
        "email_verified": true
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
        "email_verified": true
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
  goToWalletHistory(){
    this.router.navigate(['/wallet-history'])
  }
  
}