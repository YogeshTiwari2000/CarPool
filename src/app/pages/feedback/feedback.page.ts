import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTabButton, IonLabel, IonIcon, IonButton, IonRow, IonCol, IonItem, IonTextarea, IonSelect, IonSelectOption, IonList } from '@ionic/angular/standalone';
import { HandleDataService } from 'src/app/services/data/handle-data.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
  standalone: true,
  imports: [IonList, IonTextarea, IonItem, IonCol, IonRow, IonButton, IonIcon, IonLabel, IonTabButton, IonContent, IonHeader, IonTitle, IonToolbar, IonSelect, IonSelectOption, CommonModule, FormsModule]
})
export class FeedbackPage implements OnInit {
  dataservice = inject(HandleDataService)
  star: any;
  email: any = 'shubham.sholet@paavu.com'
  users: any[] = [];

  constructor() { }
  stars: any = ['1', '2', '3', '4', '5'];
  filledStars: boolean[] = [false, false, false, false, false];


  rating = [
    {
      "feedbackFields": {
        name: '',
        email: '',
        photo: '',
        star: '',
        feedback: '',
        comment: '',
      }
    }
  ]



  ngOnInit() {

    console.log('this.dataservice.user',
      this.dataservice.checkUserExists(this.email).subscribe((user) => {
        console.log("user === ", user);
      })
    );

  }

  onStarClick(index: number) {
    console.log('Star index:', index + 1);
    this.star = index + 1;
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
