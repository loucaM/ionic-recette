import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import firebase from 'firebase' ;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage = TabsPage;
  signinPage = SigninPage;
  signupPage = SignupPage;
 
  //permet de charger nav au lancement de l'appli
  @ViewChild('nav') nav: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController) {
    platform.ready().then(() => {
      firebase.initializeApp({
        apiKey: "AIzaSyBGD4qQeG_DrBkhjr50zN30hMLxcVFpRIY",
        authDomain: "ionic3-recette.firebaseapp.com"
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {

  }
}

