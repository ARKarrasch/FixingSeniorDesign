import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { LoginPage } from '../login/login';
import { KramPage } from '../kram/kram';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  name: string;
  email: string;
  password: string;
  constructor(public navCtrl: NavController, public restProvider: RestProvider) {
  }
  goToLogin(params){
    if (!params) params = {};
    this.navCtrl.push(LoginPage);
  }
  goToKram(params){
    if (!params) params = {};
    this.navCtrl.push(KramPage);
  }
  goToSignup(params){
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  }
  signup(){
    if (this.name !== null && this.email !== null && this.password !== null) {
      this.restProvider.postSignup({fullName:this.name, email:this.email, password:this.password});
      this.goToLogin(null);
    }
  }
}
