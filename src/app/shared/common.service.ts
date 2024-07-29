import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public isUserLoggedin: boolean = false
  constructor() { }
}
