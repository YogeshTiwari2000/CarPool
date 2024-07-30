import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public isUserLoggedin: boolean = false
  public currentUserEmail: string = ""
  constructor() { }
  checkEmailExists(data: any[], email: string): any | null {
    if (!data) {
      return null;
    }
    for (let item of data) {
      if (item[email]) {
        return item[email];
      }
    }
    return null;
  }
}
