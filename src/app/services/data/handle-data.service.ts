import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import {
  addDoc,
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class HandleDataService {
  public http = inject(HttpClient);
  private agfirestore: Firestore = inject(Firestore);
  private apiUrl = "http://localhost:3000/users";

  public user: any;
  public data: any;

  private firebaseNodes: any = {
    usersNode: "users",
  };
  constructor() { }

  //encrypt password
  encryptPass(getPass: string) {
    var passA = btoa(getPass);
    var passB = btoa("devil");
    var generatedPass = passA + "@$98#%" + passB;
    // console.log('generatedPass', generatedPass);
    return generatedPass;
  }
  async addUser(userData: any) {
    if (userData) {
      const collectionInstance = collection(
        this.agfirestore,
        this.firebaseNodes.usersNode
      );
      const docRef = await addDoc(collectionInstance, userData);
      console.log("docRef", docRef.id);
    }
  }

  async getData() {
    const collectionRef = collection(
      this.agfirestore,
      this.firebaseNodes.usersNode
    );
    const querySnapshot = await getDocs(collectionRef);
    const data = querySnapshot.docs.map((doc) => {
      const docData = doc.data();
      return {
        [doc.id]: {
          ...docData,
        },
      };
    });
    console.log(data);
    return data;
  }

  async userExists(userEmail: any): Promise<any> {
    if (userEmail) {
      const collectionRef = collection(
        this.agfirestore,
        this.firebaseNodes.usersNode
      );
      const q = query(collectionRef, where("userEmail", "==", userEmail));
      // console.log("q === ", q);
      let querySnapshot = await getDocs(q);
      // console.log("User Exist", querySnapshot);
      // console.log("querySnapshot.docs === ", querySnapshot.docs);
      if (querySnapshot.docs.length > 0) {
        let _data = querySnapshot.forEach((doc) => {
          this.data = doc.data();
          return this.data;
        });
        // console.log("data", this.data);

        return {
          data: this.data,
          isExist: true,
        };
      } else {
        return {
          data: null,
          isExist: false,
        };
      }
    }
    return {
      data: null,
      isExist: false,
    };
  }


  // removeable feedback page function 

  checkUserExists(email: string): Observable<any> {
    const _data = this.getData();
    return new Observable((observer) => {
      // Find the user object where the key matches the email
      // const userObj: any = _data.find((userObj: any) => userObj[email]);
      // if (userObj) {
      //   observer.next(userObj[email]);
      // } else {
      //   observer.next(false);
      // }
      // observer.complete();
    });
  }

  getExistingUserData(userData: any) {
    console.log("existingUser===", (this.user = userData));
    return (this.user = userData);
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => {
        const user = users.find((userObj) => {
          const userKeys = Object.keys(userObj);
          return userKeys.some((key) => userObj[key].userEmail === email);
        });
        return user ? user[Object.keys(user)[0]] : null; // Extract the user data
      })
    );
  }

  updateUser(user: any): Observable<any> {
    return this.getUserByEmail(user.userEmail)
      .pipe
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
      ();
  }
}
