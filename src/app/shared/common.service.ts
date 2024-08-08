import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular/standalone";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  public isUserLoggedin: boolean = false;
  public currentUserEmail: string = "";

  constructor(private alertController: AlertController) {}

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
