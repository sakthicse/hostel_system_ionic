import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
// import { ItemDetailsPage } from '../pages/item-details/item-details';
// import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HomePage } from '../pages/home/home';
import { CustomHttpServiceProvider } from '../providers/custom-http-service/custom-http-service';
import { HttpClientModule } from '@angular/common/http';
import { AttendancePage } from '../pages/attendance/attendance';
import { CommonServiceProvider } from '../providers/common-service/common-service';
import { DatePickerModule } from 'ion-datepicker';
@NgModule({
  declarations: [
    MyApp,
    // HelloIonicPage,
    // ItemDetailsPage,
    // ListPage,
    HomePage,
    LoginPage,
    AttendancePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    DatePickerModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    // HelloIonicPage,
    // ItemDetailsPage,
    // ListPage,
    
    LoginPage,
    AttendancePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    CustomHttpServiceProvider,
    CommonServiceProvider,
  ]
})
export class AppModule {}
