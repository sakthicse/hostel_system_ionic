import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonServiceProvider } from '../../providers/common-service/common-service';

/**
 * Generated class for the AttendancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html',
})
export class AttendancePage {
student_list:any=[];
url:string='';
page:number=0;
search:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams,public cs:CommonServiceProvider) {
    this.getTender()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendancePage');
  }


  getTender(){
    this.cs.showLoading();
    console.log(this.url)
      this.student_list = [];
      this.page =1;
    this.cs.get('/attendance-api/hostel-student/?page='+this.page).map(res => res)
    .subscribe(data => {
      alert("123");
      
      // this.maximumPages = data['total_pages'];
      
      this.student_list= data['results'];
      console.log(this.student_list)
      this.cs.hideLoading();
      // this.cs.hideLoading();
      // if (infiniteScroll) {
      //         infiniteScroll.complete();
      //       }
    },(err) => {
      console.log(JSON.stringify(err));
      this.cs.hideLoading();
      this.cs.checkError(err);
    })
  } 

}
