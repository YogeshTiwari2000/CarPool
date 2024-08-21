import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ride-detail-view',
  templateUrl: './ride-detail-view.page.html',
  styleUrls: ['./ride-detail-view.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RideDetailViewPage implements OnInit {
  ride: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['ride']) {
        this.ride = JSON.parse(params['ride']);
        console.log('Ride Data:', this.ride);
      }
    });
  }
}
