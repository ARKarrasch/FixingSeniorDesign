import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RestProvider {
  apiUrl = 'http://localhost:5000';
  headers: any;
  options: any;
  constructor(public http: HttpClient) {
    this.headers = new Headers();
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
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/signup', data, this.headers)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  postDelete(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/delete', data, this.headers)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  postUpdate(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/update', data, this.headers)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  postCreate(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/create', data, this.headers)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
}
