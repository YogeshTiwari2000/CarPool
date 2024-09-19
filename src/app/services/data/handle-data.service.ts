import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { LocalNotifications } from '@capacitor/local-notifications';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDocs,
  query,
  updateDoc,
  onSnapshot,
  where,
} from "@angular/fire/firestore";
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from "@angular/fire/storage";

import { LocalStorageService } from "src/app/shared/local-storage.service";
import { CommonService } from "src/app/shared/common.service";
import { object } from "@angular/fire/database";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";


@Injectable({
  providedIn: "root",
})
export class HandleDataService {
  public http = inject(HttpClient);
  public routes = inject(Router);
  // public afMessaging = inject(AngularFireMessaging);
  private agfirestore: Firestore = inject(Firestore);
  private agFireStorage: Storage = inject(Storage);

  private localStr: LocalStorageService = inject(LocalStorageService);
  private commonService: CommonService = inject(CommonService);
  private apiUrl = "http://localhost:3000/users";

  public user: any;
  public data: any;

  public uploadedFileUrl: any;

  public userCollection: any;

  private firebaseNodes: any = {
    usersNode: "users",
  };
  public allRideAvailable: any;
  selectedRidePassengerList: any;
  constructor(public afMessaging: AngularFireMessaging) {
    this.checkAndRequestNotificationPermission()
    this.listenToNotificationEvents()
  }

  subscription: Subscription | undefined;

  //encrypt pass
  encryptPass(getPass: string) {
    var passA = btoa(getPass);
    var passB = btoa("devil");
    var generatedPass = passA + "@$98#%" + passB;
    // console.log('generatedPass', generatedPass);
    return generatedPass;
  }
  //addUser
  async addUser(userData: any) {
    if (userData) {
      const collectionInstance = collection(
        this.agfirestore,
        this.firebaseNodes.usersNode
      );
      const docRef = await addDoc(collectionInstance, userData);
      console.log("docRef", docRef.id);
      this.localStr.setItem("currentUserDocId", docRef.id);
    }
  }
  // getData
  async getData() {
    // console.log("getData === ");
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

    this.userCollection = data
    // console.log("this.userCollection === ", this.userCollection); 
    const allRideLists: any[] = [];
    this.userCollection.forEach((user: any) => {
      // console.log("user ===", user);
      const firstKey = Object.keys(user)[0];
      const firstValue = user[firstKey];
      // console.log("firstValue ===", firstValue); 
      const firstValueridelist = firstValue?.ride?.rideList
      // console.log("firstValueridelist === ", firstValueridelist); 
      if (firstValueridelist != undefined)
        allRideLists.push(...firstValueridelist);
    });
    // console.log("All Ride Lists: ", allRideLists);
    this.allRideAvailable = allRideLists
    this.getAllRideLists()
    console.log("data === ", data);
    return data;
  }

  getAllRideLists() {
    // console.log(" this.allRideAvailable === ", this.allRideAvailable);
    return this.allRideAvailable
  }



  //userExists
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
          this.localStr.setItem("currentUserDocId", doc.id);
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
  //updateDocument
  async updateDocument(docId: string | any, data: any) {
    try {
      console.log("data === ", data);
      const docRef = doc(this.agfirestore, this.firebaseNodes.usersNode, docId);
      await updateDoc(docRef, data);
      this.commonService.alertBox("Document Updated", "Document update info", [
        "Ok",
      ]);
    } catch (error: any) {
      console.log("error === ", error);
      this.commonService.alertBox(
        error.message,
        "Document update error",
        ["Ok"],
        "Error occurs while updating document"
      );
    }
  }
  //updateDocumentField
  async updateDocumentField(
    docId: string | any,
    keyToUpdate: string,
    data: any
  ) {
    console.log("docId === ", docId);
    try {
      const docRef = doc(this.agfirestore, this.firebaseNodes.usersNode, docId);
      await updateDoc(docRef, {
        [keyToUpdate]: data,
      });
      console.log("data123456 === ", data);
      this.commonService.alertBox("Document field Updated", "Document update info", [
        "Ok",
      ]);
    } catch (error: any) {
      console.log("error === ", error);
      this.commonService.alertBox(
        error.message,
        "Document update error",
        ["Ok"],
        "Error occurs while updating document"
      );
    }
  }

  // async fileUplaodToFirebase(selectedFile: any) {
  //   let currentUserDocId = this.localStr.getItem("currentUserDocId");
  //   const imgFolderRef = ref(
  //     this.agFireStorage,
  //     `${this.firebaseNodes.usersNode}/${currentUserDocId}`
  //   );
  //   await uploadBytes(imgFolderRef, selectedFile)
  //     .then((snapShot) => {
  //       getDownloadURL(imgFolderRef)
  //         .then((url) => {
  //           this.uploadedFileUrl = url;
  //           return this.uploadedFileUrl;
  //         })
  //         .catch((error) => {
  //           console.error(`Error while Upload ${error}`);
  //         });
  //     })
  //     .catch((error) => {
  //       console.error(`Error while Upload ${error}`);
  //     });
  // }

  async fileUploadToFirebase(selectedFile: any) {
    let currentUserDocId = this.localStr.getItem("currentUserDocId");
    const imgFolderRef = ref(
      this.agFireStorage,
      `${this.firebaseNodes.usersNode}/${currentUserDocId}/${selectedFile.name}`
    );

    try {
      const snapShot = await uploadBytes(imgFolderRef, selectedFile);
      const url = await getDownloadURL(imgFolderRef);
      this.uploadedFileUrl = url;
      return this.uploadedFileUrl;
    } catch (error) {
      console.error(`Error while uploading: ${error}`);
      return null;
    }
  }

  async checkAndRequestNotificationPermission() {
    const permission = await LocalNotifications.checkPermissions();

    if (permission.display === 'granted') {
      console.log('Notification permission granted.');
    } else if (permission.display === 'denied') {
      console.log('Notification permission denied.');
    } else {
      const requestPermission = await LocalNotifications.requestPermissions();
      if (requestPermission.display === 'granted') {
        console.log('Notification permission granted after request.');
      } else {
        console.log('Notification permission denied after request.');
      }
    }
  }
  listenToNotificationEvents() {
    LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
      console.log('Notification clicked:', notification);
      const redirectPage = notification.notification.extra?.redirect;

      if (redirectPage) {
        // Navigate to the specified route
        this.routes.navigate([redirectPage]);
      }
    });
  }


  subscribeToAllNodes(): Observable<any[]> {
    const collectionRef = collection(
      this.agfirestore,  // this.agfirestore.firestore in v9+
      'users'                    // your collection reference (use 'this.firebaseNodes.usersNode' if necessary)
    );

    return new Observable((observer) => {
      const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          };
        });
        observer.next(data);
      }, (error) => {
        observer.error(error);
      });

      // Cleanup function when unsubscribing
      return { unsubscribe };
    });
  }

  subscribeToWallet(userId: string): Observable<any> {
    // Reference to the specific user document
    const userDocRef = doc(this.agfirestore, 'users', userId);

    return new Observable((observer) => {
      // Subscribe to the specific user document
      const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
        const userData = snapshot.data();
        console.log("userData === ", userData);
        if (userData && userData) {
          observer.next(userData);
        } else {
          observer.next(null); // or handle the case where `wallet` does not exist
        }
      }, (error) => {
        observer.error(error);
      });

      // Cleanup function when unsubscribing
      return { unsubscribe };
    });
  }




  subscribeToAllRideLists(p0: string): Observable<any[]> {
    const collectionRef = collection(
      this.agfirestore,  // Firestore instance
      'users'            // Reference to the 'users' collection
    );

    console.log('ye chl gya');


    return new Observable((observer) => {
      const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          // Extract rideList for each user
          console.log('yha tk aa gya ');

          const docData = doc.data();
          const rideList = docData?.["ride"]?.rideList || [];  // Default to empty array if rideList is not present

          return {
            id: doc.id,
            rideList: rideList,  // Include the rideList in the returned data
            ...docData,          // Spread the rest of the user data
          };
        });

        observer.next(data);  // Send the data to subscribers
      }, (error) => {
        observer.error(error);
      });

      // Cleanup function when unsubscribing
      return { unsubscribe };
    });
  }


  subscribeToRideUpdates(targetUserId: string, rideId: any, currentUserDocId: any) {
    this.subscription = this.subscribeToAllRideLists(targetUserId).subscribe((data) => {
      console.log("Changes detected for all users:", data);

      // Find the specific user in the ride list
      const userWithSpecificId = data.find((user: any) => user.id === targetUserId);
      if (userWithSpecificId) {
        console.log(`Changes detected for user with ID ${targetUserId}:`, userWithSpecificId.ride.rideList);
        const matchedRideDetect = userWithSpecificId.ride.rideList.find(
          (ride: { id: string }) => ride.id === rideId
        );
        if (matchedRideDetect) {
          // console.log("Passenger list for matched ride:", matchedRideDetect.passengerList);
          this.selectedRidePassengerList = matchedRideDetect.passengerList;
          // console.log('requestNotification kha chla');
          // console.log("targetUserId ===", targetUserId);
          // console.log("currentUserDocId === ", currentUserDocId);
          // console.log("rideId === ", rideId);
          if (targetUserId == currentUserDocId) {
            this.requestNotification();  // Trigger notification on detecting change
          }

        }
      } else {
        console.log(`No changes detected for user with ID ${targetUserId}.`);
      }
    });
  }

  async requestNotification() {
    console.log('request notification function clicked');

    this.commonService.sendNotification('carpool', 'noti ', '/profile', ' ride request send by ', "mt kr");
  };




}


