import { Component, NgModule } from '@angular/core';
import { NavController, AlertController, Loading, IonicPage ,NavParams, IonicPageModule} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
// import { Headers, RequestOptions } from '@angular/http';
// import { HttpClient } from '@angular/common/http';
import { HomePage } from '../home/home';
// import { NativeStorage } from '@ionic-native/native-storage';
import { CustomHttpServiceProvider } from '../../providers/custom-http-service/custom-http-service';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
})
// @IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: []
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { username: '', password: '' };
  device_type :string = ''
  device_data : any;

  constructor(private nav: NavController, public navParams: NavParams, private auth: AuthServiceProvider, private alertCtrl: AlertController,private cus_http:CustomHttpServiceProvider,public plt: Platform) { 


  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  public createAccount() {
    this.nav.push('RegisterPage');
  }
 
  public login() {
    this.cus_http.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {  
        
        // setTimeout( () => { this.nav.setRoot(HomePage); }, 10000 );
        this.cus_http.hideLoading()
        this.nav.setRoot(HomePage); 


  //       if(this.plt.is('ios')){
  //         this.device_type = 'ios';
  //       }
  //       if(this.plt.is('android')){
  //         this.device_type = 'android';
  //         alert("android");
  //       }
  //       this.uniqueDeviceID.get()
  // .then((uuid: any) => {
  //   this.device_data = {"device_type":this.device_type,"device_id":uuid}
  // })
  // .catch((error: any) => alert(error));
  //       alert(this.device.uuid);
  //       this.device_data = {"device_type":this.device_type,"device_id":this.device.uuid}
  //       console.log("-------------- ********** ----------------")
  //       console.log(JSON.stringify(this.device_data));
  //       this.auth.storeDeviceId(this.device_data).subscribe(data => {
  //         this.nav.setRoot(HomePage); 
  //       })
             
        
      } else {
        this.showError("Invalid user credentials");
      }
    },
      error => {
        this.showError(error);
      });
  }
 
  // showLoading() {
  //   this.loading = this.loadingCtrl.create({
  //     content: 'Please wait...',
  //     dismissOnPageChange: true
  //   });
  //   this.loading.present();
  // }
 
  showError(text) {
    this.cus_http.hideLoading()
    // this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

}
