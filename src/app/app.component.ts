import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import firebase from 'firebase' ;
import { AuthService } from '../services/auth';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  signinPage = SigninPage;
  signupPage = SignupPage;
  isAuthenticated = false ;
 
  //permet de charger nav au lancement de l'appli
  @ViewChild('nav') nav: NavController;

  constructor(
    platform: Platform,
    private menuCtrl: MenuController,
    private authService: AuthService) {
    platform.ready().then(() => {
      firebase.initializeApp({
        apiKey: "AIzaSyBGD4qQeG_DrBkhjr50zN30hMLxcVFpRIY",
        authDomain: "ionic3-recette.firebaseapp.com"
      });
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.isAuthenticated = true;
          this.rootPage = TabsPage;
        } else {
          this.isAuthenticated = false ;
          this.rootPage = SigninPage;
        }
      })
    });
  }
  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(SigninPage);
  }
}

