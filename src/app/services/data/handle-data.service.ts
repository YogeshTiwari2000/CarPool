import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDocs,
  query,
  updateDoc,
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

@Injectable({
  providedIn: "root",
})
export class HandleDataService {
  public http = inject(HttpClient);
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
  private allRideLists: any[] = [];
  constructor() { }

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
    this.allRideLists = [];
    this.userCollection.forEach((user: any) => {
      // console.log("user ===", user);
      const firstKey = Object.keys(user)[0];
      const firstValue = user[firstKey];
      // console.log("firstValue ===", firstValue); 
      const firstValueridelist = firstValue?.ride?.rideList
      // console.log("firstValueridelist === ", firstValueridelist); 
      if (firstValueridelist != undefined)
        this.allRideLists.push(...firstValueridelist);
    });
    // console.log("All Ride Lists: ", this.allRideLists);
    return data;
  }

  async getAllRideLists(): Promise<any[]> {
    if (!this.userCollection) {
      await this.getData(); // Ensure data is fetched if not already
    }
    // console.log("this.allRideLists === ", this.allRideLists);
    return this.allRideLists;
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
    try {
      const docRef = doc(this.agfirestore, this.firebaseNodes.usersNode, docId);
      await updateDoc(docRef, {
        [keyToUpdate]: data,
      });
      this.commonService.alertBox("Document field Updated", "Document update info", [
        "Ok",
      ]);
    } catch (error: any) {
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


}
