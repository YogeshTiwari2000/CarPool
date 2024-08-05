import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HandleDataService {
  getUser(): any {
    throw new Error('Method not implemented.');
  }
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

  removeKeys(obj: any, key: any) {
    if (obj.hasOwnProperty(key)) {
      delete obj[key];
    }
    return obj;
  }

  checkUserExists(email: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        // console.log("users === ", users);
        if (users) {
          return users.some(user => {
            console.log("user === ", user);

            this.user = this.removeKeys(user, "id");
            console.log(" this.user === ", this.user);
            const userKeys = Object.keys(this.user);
            // console.log("userKeys === ", userKeys);
            return userKeys.some(key => {
              const userData = user[key];
              if (userData.userEmail === email) {
                const currentUser = userData
                this.getExistingUserData(currentUser)
                return currentUser;
              }
            });
          });
        } else {
          return false;
        }
      })
    );
  }

  getExistingUserData(userData: any) {
    console.log("dsatd", this.user = userData);
    return this.user = userData
  }





  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}
