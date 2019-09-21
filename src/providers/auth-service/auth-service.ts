import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// import { Headers, RequestOptions } from '@angular/http';
// import { map, catchError } from 'rxjs/operators';
// import { Cookie } from 'ng2-cookies/ng2-cookies';
import { CustomHttpServiceProvider } from '../custom-http-service/custom-http-service';
// import { Storage } from '@ionic/storage';
export class User {
  name: string;
  email: string;
  
  
  
 
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
 
@Injectable()
export class AuthServiceProvider {
  is_login:boolean=false;
  constructor(public http: HttpClient,public cust_http:CustomHttpServiceProvider) {
    console.log('Hello RestServiceProvider Provider');
  }
 
  // getCountries(): Observable<string[]> {
  //   return this.http.post('http://localhost:8000/api-token-auth/',{"username":"admin","password":"test@123"}).pipe(
  //     map(this.extractData),
  //     catchError(this.handleError)
  //   );
  // }
  // private extractData(res: Response) {
  //   let body = res;
  //   return body || {};
  // }
  // private handleError (error: Response | any) {
  //   let errMsg: string;
  //   if (error instanceof Response) {
  //     const err = error || '';
  //     errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  //   } else {
  //     errMsg = error.message ? error.message : error.toString();
  //   }
  //   console.error(errMsg);
  //   return Observable.throw(errMsg);
  // }

  public login(credentials) {
    console.log("************")
    console.log(credentials)
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        this.cust_http.post('/api-token-auth/',credentials).map(res => res)
    .subscribe(data => {
      // alert(data['token']);
      localStorage.setItem('header_token','JWT '+data['token'])
    //  localStorage.setItem('token', data['token']);
     localStorage.setItem('login_via', 'normal');

      // this.storage.get('token').then((token) => {
      //   // alert("STTT AFFFFF");
      //   // alert(token);
      //   });

      // Cookie.set('token', data['token']);
      // Cookie.set('login_via', 'normal');
    //let myCookie = Cookie.get('cookieName');
    observer.next(true);
    observer.complete();
      
     }, error => {
     localStorage.setItem('header_token', '');
     localStorage.setItem('login_via', '');
      // Cookie.set('token', '');
      observer.next(false);
      observer.complete();
    });
        
        
      });

  
    }
  }
 
  public register(credentials) {
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
 
  
 
  public logout() {
    return Observable.create(observer => {
     
      observer.next(true);
      observer.complete();
    });
  }
  public getToken(){
    // this.storage.set('token', '123');
    //   this.storage.set('login_via', 'normal');
    // return Observable.create(observer => {
    //   this.storage.get('token').then((token) => {
    //     // alert("STTT 14444444");
    //     // alert(token);
    //     if(token){
    //       observer.next(true);
    //       observer.complete();
    //     }
    //     else{
    //       observer.next(false);
    //       observer.complete();
    //     }
        
      
    //  }, error => {
    //   observer.next(false);
    //   observer.complete();
    // });
    //   });
    let token = localStorage.getItem('header_token');
    return token;
  }


  storeDeviceId(data){
    console.log("AUTH SERVICESSSSS !!!!!!!!!!!!");
    console.log(JSON.stringify(data));
    return this.cust_http.post('/gcm-device-id/',data);
  }
}