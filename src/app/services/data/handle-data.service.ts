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
  currentUsername: any;
  previousPassengerList: any;
  currentUserRideStatus: any
  notiSenderName: any


  constructor(public afMessaging: AngularFireMessaging) {
    this.checkAndRequestNotificationPermission()
    this.listenToNotificationEvents()


    const currentUserDocId = this.localStr.getItem("currentUserDocId")
    console.log("currentUserDocId === ", currentUserDocId);
    // here we subscribe the currentUserNode
    this.subscribeToCurrentUser(currentUserDocId).subscribe((data: any) => {
      console.warn("currentUserDocId === ", currentUserDocId);
      console.warn("data ===999 ", data);
      if (data.isNotification === true) {
        this.commonService.sendNotification('carpool', ' notify ', '/' + data.notificationList[0]?.url, 'ride ' + data.notificationList[0]?.status + ' by ' + data.notificationList[0]?.senderName, data.notificationList.length);

        this.updateDocumentField(currentUserDocId, 'isNotification', false);
        this.updateDocumentField(currentUserDocId, 'notificationList', []);
        console.log("data.notificationList === ", data.notificationList);
      }
    })

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
      const firstKey = Object.keys(user)[0];
      const firstValue = user[firstKey];
      const firstValueridelist = firstValue?.ride?.rideList
      // console.log("firstValueridelist === ", firstValueridelist); 
      if (firstValueridelist != undefined)
        allRideLists.push(...firstValueridelist);//
    });
    // console.log("All Ride Lists: ", allRideLists);
    this.allRideAvailable = allRideLists
    this.getAllRideLists()
    console.log("data === ", data);
    return data;
  }

  clone(data: any) {
    return JSON.parse(JSON.stringify(data));
  }

  getAllRideLists() {
    // const map = new Map<string, any>();
    // this.allRideAvailable.forEach((obj: { id: string; }) => {
    //   map.set(obj.id, obj);
    // });
    // this.allRideAvailable = Array.from(map.values());
    // console.log(" this.allRideAvailable    === ", this.allRideAvailable);
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
      // this.commonService.alertBox("Document field Updated", "Document update info", [
      //   "Ok",
      // ]);
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


  subscribeToCurrentUser(targetUserId: string): Observable<any> {
    const docRef = doc(this.agfirestore, `users/${targetUserId}`);
    console.log("subscribeToCurrentUser === fired ");
    return new Observable((observer) => {
      const unsubscribe = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          observer.next({ id: doc.id, ...doc.data() });
        } else {
          observer.error(new Error('User not found'));
        }
      }, (error) => {
        observer.error(error);
      });

      // Correct return for the cleanup
      return () => unsubscribe(); // Proper cleanup when Observable is unsubscribed
    });
  }


}


