import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HandleDataService {
  public http = inject(HttpClient);
  private apiUrl = "http://localhost:3000/users";

  public user: any
  constructor() { }

  // getData(): any {
  //   this.http.get<any[]>("http://localhost:3000/users").subscribe((result: any[]) => {
  //     console.log("result === ", result);
  //   })
  // }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  checkUserExists(email: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        // console.log("users === ", users);
        if (users) {
          return users.some(user => {
            console.log("user === ", user);
            this.user = user
            console.log(" this.user === ", this.user);
            const userKeys = Object.keys(user);
            // console.log("userKeys === ", userKeys);
            return userKeys.some(key => {
              const userData = user[key];
              return userData.userEmail === email;
            });
          });
        } else {
          return false;
        }
      })
    );
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}
