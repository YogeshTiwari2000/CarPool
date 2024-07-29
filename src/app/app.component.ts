import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, close, arrowDown, star } from 'ionicons/icons';
import { LocalStorageService } from './shared/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet, SocialLoginModule],
})
export class AppComponent {

  public localStr = inject(LocalStorageService)
  public router = inject(Router)
  public appPages = [
    { title: 'Home', url: '/home', icon: 'mail' },
    { title: 'Not Found Page', url: '/auth', icon: 'paper-plane' },
    { title: 'Welcome Screen', url: '/welcome', icon: 'paper-plane' },
    { title: 'Search Screen', url: '/search', icon: 'paper-plane' },
    { title: 'Profile', url: '/profile', icon: 'paper-plane' },

  ];

  constructor() {
    addIcons({ mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, close, arrowDown, star });
  }

  logOut() {
    this.localStr.clear()
    this.router.navigate(['/welcome'])
  }



}
