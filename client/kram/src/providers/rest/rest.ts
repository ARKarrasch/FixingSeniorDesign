import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RestProvider {
  apiUrl = 'http://localhost:5000';
  headers: any;
  options: any;
  constructor(public http: HttpClient) {
    this.headers = new Headers();
    // this.headers.append('Access-Control-Allow-Origin' , '*');
    // this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    // this.headers.append('Accept','application/json');
    this.headers.append('content-type','application/json');

  }

  getItem(itemId) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/item/'+itemId).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  postItems(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/list', data, this.headers)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  postSignup(data) {
    console.log('POST Signup');
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/signup', data, this.headers)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
}
