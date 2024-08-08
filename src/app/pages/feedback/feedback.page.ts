import { Component, Inject, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonTabButton,
  IonLabel,
  IonIcon,
  IonButton,
  IonRow,
  IonCol,
  IonItem,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonList,
} from "@ionic/angular/standalone";
import { HandleDataService } from "src/app/services/data/handle-data.service";
import { LocalStorageService } from "src/app/shared/local-storage.service";
import { CommonService } from "src/app/shared/common.service";

@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.page.html",
  styleUrls: ["./feedback.page.scss"],
  standalone: true,
  imports: [
    IonList,
    IonTextarea,
    IonItem,
    IonCol,
    IonRow,
    IonButton,
    IonIcon,
    IonLabel,
    IonTabButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonSelect,
    IonSelectOption,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class FeedbackPage implements OnInit {
  handleData = inject(HandleDataService);
  localStorageService = inject(LocalStorageService);
  commonService = inject(CommonService);

  star: any;
  email: any = this.commonService.currentUserEmail;
  // id: any = 'zhPlRI2PZ4or8StW5qAk'
  users: any[] = [];
  feedbackForm: FormGroup;
  stars: number[] = [1, 2, 3, 4, 5];
  filledStars: boolean[] = [false, false, false, false, false];
  rating = [
    {
      feedbackFields: {
        name: "",
        email: "",
        photo: "",
        star: "",
        fbDetails: [],
        comment: "",
      },
    },
  ];

  constructor(private FormBuilder: FormBuilder) {
    this.feedbackForm = this.FormBuilder.group({
      star: [0, Validators.required],
      feedbackOptions: [[]],
      comment: [""],
    });
  }

  ngOnInit() {
    this.handleData
      .userExists(this.email)
      .then((result) => {
        if (result.isExist) {
          this.handleData.user = result.data;
          console.log("User data:", result.data);
        } else {
          console.log("User not found");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  onStarClick(index: number) {
    console.log("Star index:", index + 1);
    this.star = index + 1;
    for (let i = 0; i < this.stars.length; i++) {
      this.filledStars[index] = true;
      this.filledStars[i] = i <= index;
    }
    this.feedbackForm.patchValue({
      star: this.star,
    });
  }

  // handleChange(event: any) {
  //   console.log('ionChange fired with value: ' + event.detail.value);
  // }

  // handleCancel() {
  //   console.log('ionCancel fired');
  // }

  // handleDismiss() {
  //   console.log('ionDismiss fired');
  // }

  submitFeedback() {
    console.log("Feedback submitted successfully");
    console.log(this.feedbackForm.value);
    const feedbackValues = this.feedbackForm.value;

    // Ensure user data is available
    const currentUser = this.handleData.user;
    console.log("currentUser === ", currentUser);
    if (currentUser) {
      this.rating[0].feedbackFields = {
        name: currentUser.userName || "",
        email: this.email,
        photo: currentUser.profilePicture || "",
        star: feedbackValues.star,
        fbDetails: feedbackValues.feedbackOptions,
        comment: feedbackValues.comment,
      };

      console.log(this.rating);

      currentUser.feedback = this.rating[0].feedbackFields;
      const currentUserDocId =
        this.localStorageService.getItem("currentUserDocId");

      console.log("Updated Current User:", currentUser);
      console.log("currentUserDocId === ", currentUserDocId);
      this.handleData.updateDocument(currentUserDocId, currentUser);
    }
  }
}
