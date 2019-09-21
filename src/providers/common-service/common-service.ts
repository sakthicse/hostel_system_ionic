import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomHttpServiceProvider } from '../custom-http-service/custom-http-service';
import { LoadingController,Loading } from 'ionic-angular';
/*
  Generated class for the CommonServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonServiceProvider {
  loading: Loading;
  constructor(public http: HttpClient,public custom_http: CustomHttpServiceProvider,private loadingCtrl: LoadingController) {
    console.log('Hello CommonServiceProvider Provider');
  }
  get(url){
    return this.custom_http.get(url);
  }
  post(url,data){
    return this.custom_http.post(url,data);
  }
  put(url,data){
    return this.custom_http.put(url,data);
  }
  checkError(error) {
    return this.custom_http.checkError(error);
  }
  getDetail(url){
    return this.custom_http.get(url);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
  hideLoading() {
    this.loading.dismiss();
  }

}
