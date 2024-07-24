import { Component, OnInit } from '@angular/core';
import { IonInput, IonInputPasswordToggle, IonItem } from "@ionic/angular/standalone";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonItem, IonInput, IonInputPasswordToggle]
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("Login Modal");
  }

}
