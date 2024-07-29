declare var google: any
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocialLoginService {
  private client_id = '193485925855-ri8is9m3kd2pr2pfcfqifar7bn1tvkg3.apps.googleusercontent.com'
  constructor() { }

  // google login
  googleLogin(tagId: string) {
    google.accounts.id.initialize({
      client_id: this.client_id,
      callback: (res: any) => {
        if (res) {
          const payload = this.decodeToken(res.credential)
          sessionStorage.setItem("googleUserLog", JSON.stringify(payload))
        }
      }
    });
    google.accounts.id.renderButton(document.getElementById(tagId), {
      theme: "filled-blue",
      size: "larger",
      shape: 'rectangle',
      width: 350
    })
  }
  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]))
  }
  // google login
}
