import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UserDataProvider } from '../../providers/user-data/user-data'
import { KramPage } from '../kram/kram';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  email: string;
  password: string;
  userData: any;

  constructor(public navCtrl: NavController, public restProvider: RestProvider, public userDataProvider: UserDataProvider) {
  }
  goToKram(params) {
    if (!params) params = {};
    this.navCtrl.push(KramPage);
  }
  goToSignup(params) {
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  }
  public goToLogin(params) {
    if (!params) params = {};
    this.navCtrl.push(LoginPage);
  }

  login() {
    if (this.email !== null && this.password !== null) {
      this.restProvider.postLogin({ email: this.email, password: this.password }).then(res => this.userData = res)
        .then(() => {
          this.userDataProvider.userId = this.userData.userId;
          this.userDataProvider.email = this.userData.email;
          this.userDataProvider.fullName = this.userData.fullName;
        });
      this.goToKram(null);
    }
  }
}
