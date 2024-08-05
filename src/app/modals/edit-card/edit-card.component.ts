import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalController, IonHeader, IonIcon, IonToolbar, IonTitle, IonButton, IonContent, IonCard, IonCol, IonInput, IonRow, IonInputPasswordToggle, IonToggle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss'],
  standalone: true,
  imports: [IonToggle, IonRow, IonInput, IonCol, IonCard, IonContent, IonButton, IonTitle, IonToolbar, IonIcon, IonHeader, CommonModule, FormsModule, IonInputPasswordToggle]
})
export class EditCardComponent implements OnInit {
  @Input() data: any;
  public modalCtrl = inject(ModalController)

  constructor() { }

  ngOnInit() {
    console.log("edit modal", this.data);
  }

  passCheck = false;
  validatePassword() {
    if (this.data.password != this.data.cpassword) {
      this.passCheck = true
    } else {
      this.passCheck = false
    }
  }

  changePass = false
  togglePassChange() {
    this.changePass = !this.changePass
  }

  close() {
    const data = "test data"
    this.modalCtrl.dismiss(data, "backdrop")
  }

}
