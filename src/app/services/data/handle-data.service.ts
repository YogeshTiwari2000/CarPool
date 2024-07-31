import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleDataService {
  public http = inject(HttpClient)
  private apiUrl = 'http://localhost:3000/users';
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
    console.log("email === ", email);
    let data: any = this.http.get<any[]>(`${this.apiUrl}?userEmail=${email}`).pipe(
      map((users: any) => {
        console.log("users === ", users);
        users.length > 0
      })
    );
    return data
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}
