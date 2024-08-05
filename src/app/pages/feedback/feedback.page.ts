import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTabButton, IonLabel, IonIcon, IonButton, IonRow, IonCol, IonItem, IonTextarea, IonSelect, IonSelectOption, IonList } from '@ionic/angular/standalone';
import { HandleDataService } from 'src/app/services/data/handle-data.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
  standalone: true,
  imports: [IonList, IonTextarea, IonItem, IonCol, IonRow, IonButton, IonIcon, IonLabel, IonTabButton, IonContent, IonHeader, IonTitle, IonToolbar, IonSelect, IonSelectOption, CommonModule, FormsModule, ReactiveFormsModule]
})
export class FeedbackPage implements OnInit {
  dataservice = inject(HandleDataService)
  star: any;
  email: any = 'sholetshubham8@gmail.com'
  users: any[] = [];
  feedbackForm: FormGroup;
  stars: any = ['1', '2', '3', '4', '5'];
  filledStars: boolean[] = [false, false, false, false, false];
  rating = [
    {
      "feedbackFields": {
        name: '',
        email: '',
        photo: '',
        star: '',
        fbDetails: [],
        comment: '',
      }
    }
  ]

  constructor(private FormBuilder: FormBuilder) {
    this.feedbackForm = this.FormBuilder.group({
      star: [null, Validators.required],
      feedbackOptions: [[]],
      comment: ['']
    });
  }



  ngOnInit() {
    this.dataservice.checkUserExists(this.email).subscribe((userExists: boolean) => {
      const currentUser = this.dataservice.user;
      console.log('Current User here is:', currentUser);
    });
  }

  onStarClick(index: number) {
    console.log('Star index:', index + 1);
    this.star = index + 1;
    for (let i = 0; i < this.stars.length; i++) {
      this.filledStars[index] = true;
      this.filledStars[i] = i <= index;
    }
    this.feedbackForm.patchValue({
      star: this.star
    });
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
    console.log(this.feedbackForm.value);
    const feedbackValues = this.feedbackForm.value;

    this.rating[0].feedbackFields = {
      name: this.dataservice.user?.userName || '',
      email: this.email,
      photo: this.dataservice.user?.profilePicture || '',
      star: feedbackValues.star,
      fbDetails: feedbackValues.feedbackOptions,
      comment: feedbackValues.comment
    };

    console.log(this.rating);

    const currentUser = this.dataservice.user;
    if (currentUser) {
      currentUser.feedback = this.rating[0].feedbackFields;
      console.log('Updated Current User:', currentUser);

      this.dataservice.updateUser(currentUser).subscribe((response: any) => {
        console.log('User updated with feedback:', response);
      });
    }

  }
}
