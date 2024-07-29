declare var google: any
import { Injectable, OnInit } from '@angular/core';
import { SocialAuthService, SocialAuthServiceConfig, FacebookLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class SocialLoginService {
  private client_id = '193485925855-ri8is9m3kd2pr2pfcfqifar7bn1tvkg3.apps.googleusercontent.com';

  private facebookAppId = '852363663092517';

  user: SocialUser | null = null;
  loggedIn: boolean = false;

  constructor(private authService: SocialAuthService, public localStr: LocalStorageService) {
    this.authService.authState.subscribe((user: SocialUser) => {
      this.user = user;
      console.log('User:', this.user);
      this.loggedIn = (user != null);
    });
  }

  // google login
  googleLogin(tagId: string) {
    google.accounts.id.initialize({
      client_id: this.client_id,
      callback: (res: any) => {
        if (res) {
          const payload = this.decodeToken(res.credential)
          sessionStorage.setItem("googleUserLog", JSON.stringify(payload))
          this.localStr.setItem("googleUserLog", payload)
        }
      }
    });
    google.accounts.id.renderButton(document.getElementById(tagId), {
      theme: "outline",
      size: "larger",
      shape: 'rectangle',
      width: 350,
      text: "sign_in_with"
    })
  }
  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]))
  }
  // google login

  // Facebook login
  facebookLogin(): void {
    // console.log("Facebook Provider ID: ", FacebookLoginProvider.PROVIDER_ID);
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((user: SocialUser) => {
      console.log('Facebook user logged in:', user);
      sessionStorage.setItem("facebookUserLog", JSON.stringify(user));
    }).catch(err => {
      console.error('Facebook login error:', err);
    });
  }
  // Facebook login
}
