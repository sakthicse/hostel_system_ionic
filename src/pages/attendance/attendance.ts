import { Component,ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonServiceProvider } from '../../providers/common-service/common-service';
import { DatePickerDirective } from 'ion-datepicker';
import { DatePipe } from '@angular/common'

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
  providers: [DatePickerDirective,DatePipe],
})
export class AttendancePage {
  @ViewChild(DatePickerDirective) public datepicker: DatePickerDirective;
  public localDate: Date = new Date();
  public initDate: Date = new Date();
  public initDate2: Date = new Date();
  public minDate: Date =  new Date();
  public disabledDates: Date[] = [new Date(2017, 7, 14)];
student_list:any=[];
url:string='';
page:number=0;
search:string='';
update_attendance:any={};
select_all:boolean=false;
current_year:string='';
  constructor(public navCtrl: NavController, public navParams: NavParams,public cs:CommonServiceProvider,public datepipe: DatePipe) {
    this.getCurrentYear();
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendancePage');
  }


  getStudent(){
    this.cs.showLoading();
    console.log(this.url)
      this.student_list = [];
      this.page =1;
    this.cs.get('/attendance-api/hostel-student/?page='+this.page+"&search="+this.search+"&purpose=form&current_year="+this.current_year).map(res => res)
    .subscribe(data => {
      
      // this.maximumPages = data['total_pages'];
      
      this.student_list= data['results'];
      if(this.student_list.length > 0){
        this.student_list.forEach(element => {
          this.update_attendance[element.id]=0;
        });
        this.cs.hideLoading();
        this.getAttendance()
      }else{
        this.cs.hideLoading();
      }
      
     
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


  getAttendance(){
    this.cs.showLoading();
    
      this.page =1;
    this.cs.get('/attendance-api/attendance/?page='+this.page+"&search="+this.search+"&purpose=form").map(res => res)
    .subscribe(data => {
      if( data['results'].length > 0){
        data['results'].forEach(element => {
          this.update_attendance[element.hostel_student]=element.is_present;
        });
      }
      
      this.cs.hideLoading();
     
    },(err) => {
      console.log(JSON.stringify(err));
      this.cs.hideLoading();
      this.cs.checkError(err);
    })
  } 
sellectAll(event){
  console.log(this.initDate)
  var current_val;
  if(this.select_all){
    current_val=true;
  }else{
    current_val=false
  }
  if(this.student_list.length > 0){
    this.student_list.forEach(element => {
      this.update_attendance[element.id]=current_val;
    });
  }
}

onInput(){
  this.getStudent();
}
onClear(){
  this.search = ''
  this.getStudent();
}
onCancelEve(){
  this.getStudent();
}
    // public closeDatepicker(){
    //     this.datepickerDirective.modal.dismiss();
    // }
    saveAttendance(){
      this.cs.showLoading();
      // save-attendance
      this.cs.post('/attendance-api/save-attendance/',this.update_attendance).map(res => res)
      .subscribe(data => {
        this.cs.hideLoading();
        this.getStudent();
      },(err) => {
        console.log(JSON.stringify(err));
        this.cs.hideLoading();
        this.cs.checkError(err);
      })
    }


    getCurrentYear(){
      this.cs.showLoading();
      
        this.page =1;
      this.cs.get('/attendance-api/year/?page='+this.page+"&get_current_year=1").map(res => res)
      .subscribe(data => {
        if(data['results'].length > 0){
          this.current_year = data['results'][0].id
        }else{
          this.current_year = ''
        }
        this.cs.hideLoading();
        this.getStudent()
        
        
        
       
       
      },(err) => {
        console.log(JSON.stringify(err));
        this.cs.hideLoading();
        this.cs.checkError(err);
      })
    } 
}
