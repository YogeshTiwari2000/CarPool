import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close, arrowDown, star, search, home, person, pin, navigate, location, arrowForwardOutline, chevronForwardOutline, carSportOutline, addCircleOutline, checkmarkCircleOutline, call, create, chevronBackOutline, locate, starOutline, informationCircleOutline, exit, chatbubbles, wallet } from 'ionicons/icons';
import { LocalStorageService, } from './shared/local-storage.service';
import { CommonService } from './shared/common.service';
import { HandleDataService } from './services/data/handle-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet, SocialLoginModule,],
})
export class AppComponent {
  public commonService = inject(CommonService)
  public localStr = inject(LocalStorageService)
  public router = inject(Router)
  private handleData = inject(HandleDataService)
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Search Screen', url: '/search', icon: 'search' },
    { title: 'Profile', url: '/profile', icon: 'person' },
    { title: 'Feedback', url: '/feedback', icon: 'chatbubbles' },
    { title: 'Wallet', url: '/myWallet', icon: 'wallet' },
  ];

  datalist$: Observable<any> = new Observable()

  constructor() {
    addIcons({ close, arrowDown, star, search, home, person, pin, navigate, location, arrowForwardOutline, chevronForwardOutline, carSportOutline, addCircleOutline, checkmarkCircleOutline, call, create, chevronBackOutline, locate, starOutline, informationCircleOutline, exit, chatbubbles, wallet });
    if (this.localStr.getItem("googleUserLog")) {
      const user = this.localStr.getItem("googleUserLog")
      this.commonService.currentUserEmail = user.email
    }
    else {
      this.commonService.currentUserEmail = "Your@email.com"
    }

    this.datalist$ = this.handleData.getData()



  }

  logOut() {
    this.localStr.clear()
    this.router.navigate(['/welcome'])
  }

}
