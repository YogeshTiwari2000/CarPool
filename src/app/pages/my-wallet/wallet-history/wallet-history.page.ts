import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { HandleDataService } from '../../../services/data/handle-data.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonAvatar, IonCardSubtitle, IonCardTitle, IonCard, IonItem, IonText, IonLabel, IonIcon, IonCol, IonRow, IonGrid, IonList, IonImg, IonSearchbar, IonDatetimeButton, IonDatetime, IonModal, IonButtons, IonMenuButton, IonButton, IonPopover } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { cog } from 'ionicons/icons';

type TransactionType = 'credit' | 'debit';

@Component({
  selector: 'app-my-wallet',
  templateUrl: './wallet-history.page.html',
  styleUrls: ['./wallet-history.page.scss'],
  standalone: true,
  imports: [IonPopover, IonButton, IonButtons, IonModal, IonDatetime, IonDatetimeButton, IonSearchbar, IonImg, IonList, IonGrid, IonRow, IonCol, IonIcon, IonLabel, IonText, IonItem, IonCard, IonCardTitle, IonCardSubtitle, IonAvatar, IonCardHeader, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonMenuButton]
})
export class MyWalletPage implements OnInit {
  @ViewChild('modal', { static: true }) modal!: IonModal;

  currentUserData: any;
  transactionList: any[] = [];
  filteredData: any[] = [];
  originalData: any[] = [];
  selectedFromDateTime: string | null = null;
  selectedToDateTime: string | null = null;
  selectedType: TransactionType | null = null;
  isModalOpen = false;
  searchTerm: string = '';

  constructor(private router: Router, private cdr: ChangeDetectorRef, private commonService: CommonService,
    public localStr: LocalStorageService, private handleData: HandleDataService) { }

  ngOnInit() {
    const currentUserEmail = this.commonService.currentUserEmail;

    this.handleData.userExists(currentUserEmail).then((res) => {
      this.currentUserData = res.data;
      this.transactionList = this.currentUserData.wallet.transactionsList;
      this.originalData = [...this.transactionList]; // Store original data for filtering
      this.filteredData = [...this.transactionList];
    });
  }

  onFilterButtonClicks() {
    this.isModalOpen = true;
  }

  onModalDismiss() {
    this.isModalOpen = false;
  }
  onDateTimeChange(event: any, type: 'from' | 'to') {
    const selectedDate = event.detail.value ? new Date(event.detail.value).toISOString() : null;

    if (type === 'from') {
      this.selectedFromDateTime = selectedDate;
      console.log("this.selectedFromDateTime === ", this.selectedFromDateTime);
    } else {
      this.selectedToDateTime = selectedDate;
      console.log("this.selectedToDateTime === ", this.selectedToDateTime);
    }

    // Apply filters with the updated dates
    this.filterByDate(this.selectedFromDateTime, this.selectedToDateTime);
  }




  filterByDate(fromDate: string | null, toDate: string | null) {
    console.log(`Filtering from ${fromDate} to ${toDate}`);

    this.filteredData = this.originalData.filter(transaction => {
      const transactionDate = new Date(transaction.date).toISOString(); // Convert to ISO format
      // console.log("transactionDate === ", transactionDate);

      // Check if both fromDate and toDate are null
      if (!fromDate && !toDate) {
        return true; // No date filter applied
      }

      // Check if only fromDate is provided
      if (fromDate && !toDate) {
        return new Date(fromDate) <= new Date(transactionDate);
      }

      // Check if only toDate is provided
      if (!fromDate && toDate) {
        return new Date(toDate) >= new Date(transactionDate);
      }

      // Check if both fromDate and toDate are provided
      if (fromDate && toDate) {
        return new Date(fromDate) <= new Date(transactionDate) && new Date(transactionDate) <= new Date(toDate);
      }

      return false; // Default case
    });

    this.cdr.detectChanges(); // Manually trigger change detection
  }

  filterByType(type: TransactionType) {
    this.selectedType = type;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredData = this.originalData.filter(transaction => {
      const date = new Date(transaction.date);
      const fromDate = this.selectedFromDateTime ? new Date(this.selectedFromDateTime) : null;
      const toDate = this.selectedToDateTime ? new Date(this.selectedToDateTime) : null;

      // Filter by date range
      const isWithinDateRange = (!fromDate || date >= fromDate) && (!toDate || date <= toDate);

      // Filter by type
      const isTypeMatch = !this.selectedType || transaction.type === this.selectedType;
      console.log("isTypeMatch === ", isTypeMatch);

      // Filter by name
      const isNameMatch = transaction.paidTo.toLowerCase().includes(this.searchTerm.toLowerCase());

      return isWithinDateRange && isTypeMatch && isNameMatch;
    });
  }

  filterData(event: any) {
    this.searchTerm = event.target.value;
    this.applyFilters();
  }
}
