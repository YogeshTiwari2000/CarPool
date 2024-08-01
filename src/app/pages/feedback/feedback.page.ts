import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTabButton, IonLabel, IonIcon, IonButton, IonRow, IonCol, IonItem, IonTextarea, IonSelect, IonSelectOption, IonList } from '@ionic/angular/standalone';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
  standalone: true,
  imports: [IonList, IonTextarea, IonItem, IonCol, IonRow, IonButton, IonIcon, IonLabel, IonTabButton, IonContent, IonHeader, IonTitle, IonToolbar, IonSelect, IonSelectOption, CommonModule, FormsModule]
})
export class FeedbackPage implements OnInit {
  rating: any;
  email: any = 'sholetshubham8@gmail.com'
  constructor() { }
  stars: any = ['1', '2', '3', '4', '5'];
  filledStars: boolean[] = [false, false, false, false, false];

  ngOnInit() {

  }

  onStarClick(index: number) {
    console.log('Star index:', index + 1);
    this.rating = index + 1;
    for (let i = 0; i < this.stars.length; i++) {
      this.filledStars[index] = true;
      this.filledStars[i] = i <= index;
    }
  }

  handleChange(event: any) {
    console.log('ionChange fired with value: ' + event.detail.value);
  }

  handleCancel() {
    console.log('ionCancel fired');
  }

  handleDismiss() {
    console.log('ionDismiss fired');
  }

  submitFeedback() {
    console.log('feedback submitted successfully');

  }
}
