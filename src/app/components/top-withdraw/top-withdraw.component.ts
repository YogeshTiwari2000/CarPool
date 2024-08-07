import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-withdraw',
  templateUrl: './top-withdraw.component.html',
  styleUrls: ['./top-withdraw.component.scss'],
  standalone: true,
  imports: []
})
export class TopWithdrawComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('topUp');
  }

}
