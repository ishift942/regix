import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import {User} from '../shared/user';
import {Route} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
API_URL  =  'http://192.168.1.133:8080/ov-connect-webService-userscn-olddb/resources/Users';
  constructor(private httpClient: HttpClient) { }
  createUser(user){
    console.log("user IN CREATION ---->", user);
      this.httpClient.post(this.API_URL , user )
      .subscribe(
        data => {
          console.log('POST Request is successful ', data );
          console.log(this.responseCode);
        },
        (err: HttpErrorResponse) => {
                  if (err.error instanceof Error) {
                    console.log("Client-side error occured.");
                  } else {
                    console.log("Server-side error occured.");
                  }
                },

        complete => {
          }
      );
  }
}
