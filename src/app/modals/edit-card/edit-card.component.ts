import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalController, IonHeader, IonIcon, IonToolbar, IonTitle, IonButton, IonContent, IonCard, IonCol, IonInput, IonRow } from '@ionic/angular/standalone';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss'],
  standalone: true,
  imports: [IonRow, IonInput, IonCol, IonCard, IonContent, IonButton, IonTitle, IonToolbar, IonIcon, IonHeader, CommonModule, FormsModule]
})
export class EditCardComponent implements OnInit {
  @Input() data: any;
  public modalCtrl = inject(ModalController)

  constructor() { }

  ngOnInit() {
    console.log("edit modal", this.data);
  }

  close() {
    const data = "test data"
    this.modalCtrl.dismiss(data, "backdrop")
  }

}
