import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Cookie } from 'ng2-cookies/ng2-cookies';
import { LoadingController,Loading,App } from 'ionic-angular';
// import { Storage } from '@ionic/storage';
import { LoginPage } from  '../../pages/login/login';
/*
  Generated class for the CustomHttpServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CustomHttpServiceProvider {
  token:string;
  login_via:string;
  // api_url="http://localhost:8000"
  // api_url="http://192.168.43.42:8000"
  api_url="http://192.168.1.4:8000"
  headers:any={};
  loading: Loading;
  constructor(public http: HttpClient, private loadingCtrl: LoadingController,public app: App) {
    console.log('Hello CustomHttpServiceProvider Provider');
    this.token = localStorage.getItem('header_token');
    this.login_via = localStorage.getItem('login_via');
    if(this.token){
      this.headers = { "headers": {"Authorization": this.token} };
    }
   
  }
  test(url){
    //alert("test");
    return "new"
  }
    get(url) {
      // alert(this.api_url+url)
      console.log("--------- *********** ------");
      console.log(JSON.stringify(this.getHeader()));
      console.log("============================")
    return this.http.get(this.api_url+url, this.getHeader());
  }
  post(url,data) {
    // alert(this.api_url+url);
    return this.http.post(this.api_url+url,data, this.getHeader());
  }
  put(url,data) {
    
    return this.http.put(this.api_url+url,data, this.getHeader());
  }
  checkError(error){
    if(error.status === 401){
      //invalid token
      // remove user from local storage to log user out
      var login_via = localStorage.getItem('login_via');
   

      localStorage.removeItem('header_token');
      localStorage.removeItem('login_via');
      this.app.getActiveNav().setRoot(LoginPage);
      // this.navCtrl.setRoot(LoginPage);
    }
    else if(error.status === 400){
        //alert("validation error");
    }
    else{
        alert("error");
    }
}

  getHeader(){
    // this.storage.get('token').then((token) => {
    //   this.token = token;
    // })
    // this.storage.get('login_via').then((login_via) => {
    //   this.login_via = login_via;
    //   if(this.token){
    //     if(this.login_via == 'google'){
    //       // this.headers = {"headers":{"Authorization":"Bearer eGUngxTd4ZMvT3qZQnGewPYBmyPYyu"}};
    //       this.headers = { "headers": {"Authorization": "Bearer "+this.token} };
    //     }else{
    //       // this.headers = {"headers":{"Authorization":"Bearer eGUngxTd4ZMvT3qZQnGewPYBmyPYyu"}};
    //       this.headers = { "headers": {"Authorization": "JWT "+this.token} };
    //     }
    //     // return this.headers;
    //   }
    //   return this.headers;
    // })
    this.token = localStorage.getItem('header_token');
    this.login_via = localStorage.getItem('login_via');
    if(this.token){
      this.headers = { "headers": {"Authorization": this.token} };
      // if(this.login_via == 'google'){
      //   // this.headers = {"headers":{"Authorization":"Bearer eGUngxTd4ZMvT3qZQnGewPYBmyPYyu"}};
      //   this.headers = { "headers": {"Authorization": "Bearer "+this.token} };
      // }else{
      //   // this.headers = {"headers":{"Authorization":"Bearer eGUngxTd4ZMvT3qZQnGewPYBmyPYyu"}};
      //   this.headers = { "headers": {"Authorization": "JWT "+this.token} };
      // }
    }

    // console.log("--------------------------")
    // console.log(this.headers);
    return this.headers;
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    // this.loading = this.loadingCtrl.create({
    //   content: 'Please wait...',
    //   dismissOnPageChange: true
    // });
    this.loading.present();
  }
  hideLoading() {
    this.loading.dismiss();
  }

}
