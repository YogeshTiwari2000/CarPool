declare var google: any
import { Injectable, OnInit } from '@angular/core';
import { SocialAuthService, SocialAuthServiceConfig, FacebookLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
@Injectable({
  providedIn: 'root'
})
export class SocialLoginService implements OnInit {
  private client_id = '193485925855-ri8is9m3kd2pr2pfcfqifar7bn1tvkg3.apps.googleusercontent.com';
  private facebookAppId = '852363663092517';
  user: SocialUser | null = null;
  loggedIn: boolean = false;
  constructor(private authService: SocialAuthService) { }
  ngOnInit() {
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


  // Facebook login
  facebookLogin(): void {
    console.log('Service Facebook login function called');
    console.log("Facebook Provider ID: ", FacebookLoginProvider.PROVIDER_ID);

    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((user: SocialUser) => {
      console.log('Facebook user logged in:', user);
      sessionStorage.setItem("facebookUserLog", JSON.stringify(user));
      // Access user information
      console.log('Facebook User Information:');
      console.log('Name:', user.name);
      console.log('Email:', user.email);
      console.log('Photo URL:', user.photoUrl);
    }).catch(err => {
      console.error('Facebook login error:', err);
    });
  }


  // Facebook login
}
