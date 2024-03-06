import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http'
import { UiService } from './services/ui.service';


@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL: any;
  readonly firebaseUrl: any;
  constructor(private http: HttpClient) { 
    this.ROOT_URL = 'http://localhost:3000';
    this.firebaseUrl = 'https://us-central1-firstcrud-6ee6e.cloudfunctions.net/app'
    // this.firebaseUrl = 'http://127.0.0.1:5001/firstcrud-6ee6e/us-central1/app';
   }


  get(uri: string) {
    //return this.http.get(`${this.ROOT_URL}/${uri}`);
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: string, payload: object) {
    // return this.http.post(`${this.ROOT_URL}/${uri}`, payload)
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload)
  }

  
  patch(uri: string, payload: object) {
    console.log(uri)
    // return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete(uri: string) {
    // return this.http.delete(`${this.ROOT_URL}/${uri}`);
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }
}
