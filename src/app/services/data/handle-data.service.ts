import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable, of, switchMap } from "rxjs";

import data from '../../../assets/db.json';


@Injectable({
  providedIn: "root",
})
export class HandleDataService {

  public http = inject(HttpClient);
  private apiUrl = "http://localhost:3000/users";

  public user: any
  constructor() {
    console.log("data === ", data);
  }

  getData() {
    return data.users;
  }

  checkUserExists(email: string): Observable<any> {
    const _data = this.getData();
    return new Observable(observer => {
      // Find the user object where the key matches the email
      const userObj: any = _data.find((userObj: any) => userObj[email]);
      if (userObj) {
        observer.next(userObj[email]);
      } else {
        observer.next(false);
      }
      observer.complete();
    });
  }

  getExistingUserData(userData: any) {
    console.log("existingUser===", this.user = userData);
    return this.user = userData
  }


  // addUser(user: any): Observable<any> {
  //   return this.http.post(this.apiUrl, user);
  // }

  addUser(user: any): Observable<any> {
    data.users.push(user);
    return of({ success: true, user });
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(userObj => {
          const userKeys = Object.keys(userObj);
          return userKeys.some(key => userObj[key].userEmail === email);
        });
        return user ? user[Object.keys(user)[0]] : null; // Extract the user data
      })
    );
  }


  updateUser(user: any): Observable<any> {
    return this.getUserByEmail(user.userEmail).pipe(
      // switchMap(existingUser => {
      //   if (!existingUser) {
      //     throw new Error("User not found");
      //   }

      //   const userId = Object.keys(existingUser)[0]; // Assuming there is only one key per user object
      //   console.log("userId === ", userId);
      //   console.log("user === ", user);
      //   // Send the PUT request to update the specific user entry
      //   return this.http.put(`${this.apiUrl}/${userId}`, user);
      // })
    );
  }



}
