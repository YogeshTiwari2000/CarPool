import { Injectable, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular/standalone";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  public isUserLoggedin: boolean = false;
  public currentUserEmail: string = "";

  constructor(private alertController: AlertController) {
    const data: any = localStorage.getItem("currentUser");
    const parsedData: any = JSON.parse(data);
    console.log("parsedData === ", parsedData);
    this.currentUserEmail = parsedData.userEmail
  }


  async alertBox(
    message: string,
    header: string,
    buttons?: string[],
    subHeader?: string
  ) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: buttons,
    });

    await alert.present();
  }
}
