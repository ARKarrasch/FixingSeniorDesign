import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { KramPage } from '../pages/kram/kram';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ItemPage } from '../pages/item/item';
import { PopoverPage } from '../pages/kram/kram';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { UserDataProvider } from '../providers/user-data/user-data';

@NgModule({
  declarations: [
    MyApp,
    KramPage,
    LoginPage,
    SignupPage,
    ItemPage,
    PopoverPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    KramPage,
    LoginPage,
    SignupPage,
    ItemPage,
    PopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    UserDataProvider
  ]
})
export class AppModule {}