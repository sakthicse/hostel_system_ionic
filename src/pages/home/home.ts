import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

// import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loginPage = LoginPage;
 
  railway_tender_count:number;
  bhel_tender_count:number;
  params:any;
  joinDate:string;
  constructor(public navCtrl: NavController,private auth: AuthServiceProvider) {
    let d = new Date();
    this.joinDate = d.getFullYear()+'-'+("0" + (d.getMonth() + 1)).slice(-2)+'-'+("0" + d.getDate()).slice(-2);
    this.params = { 'current_date': this.joinDate };
   var token = this.auth.getToken();
  //  alert(token)
    if (!token){
      this.navCtrl.setRoot(LoginPage);
     }
 
  
  }
  detailPage(val){
    // if(val == 'railway'){
    //   this.navCtrl.setRoot(RailwayTenderPage, {
    //     current_date: this.joinDate
    //   })
    // }else if( val== 'bhel'){
    //   this.navCtrl.setRoot(BhelTenderPage, {
    //     current_date: this.joinDate
    //   })
    // }
  }

}
