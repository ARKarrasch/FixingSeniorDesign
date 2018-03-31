import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { UserDataProvider } from '../providers/user-data/user-data'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  userData: UserDataProvider;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, userDataProvider: UserDataProvider) {
    this.userData = userDataProvider;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  public goToLogin(params) {
    this.nav.push(LoginPage);
  }

}
