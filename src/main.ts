import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { FacebookLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        lang: 'en',
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('852363663092517', {
              scope: 'email, public_profile' // Request permissions here
            })
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }, provideFirebaseApp(() => initializeApp({"projectId":"carpool-4bac6","appId":"1:131793287583:web:b600ce74c07df536e765aa","storageBucket":"carpool-4bac6.appspot.com","apiKey":"AIzaSyDOzD2DHJnnZNm7R23awls9_dmqht-PV2E","authDomain":"carpool-4bac6.firebaseapp.com","messagingSenderId":"131793287583","measurementId":"G-4PDKQ35BBJ"})), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideStorage(() => getStorage())
  ],



});
