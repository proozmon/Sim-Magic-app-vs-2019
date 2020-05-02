import { Component, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, range } from 'rxjs';
import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
  ],
  imports: [
    HttpClient,
  ],
  providers: [],
})

@Injectable(
)

export class DataService {

  public baseURL = "";
  public client: HttpClient;

  constructor(
    client: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseURL = baseUrl;
    this.client = client;
  }

  // ********************************************
  // Notes:
  // 1. To view the results of the HTTP calls,
  //    use the F12 funcion in Chrome and
  //    select Console, etc
  // 2. Remember thatlambdas are asynchronous, so
  //    the results will be returned out of phase  
  // ********************************************

  public getAllUserIDs(): Observable<UserIDComponents[]> {

    console.log('Getting the user ID components');

    var url = this.baseURL + 'userIDComponents';

    return this.client.get<UserIDComponents[]>(url);
  }

  public getSpecifiedUserID(userName1: string, userName2: string): Observable<UserIDComponents[]> {

    console.log('Getting the specified user ID components');

    var delimeter = '/';
    var param1 = userName1;
    var param2 = userName2;

    var params = delimeter + userName1 + delimeter + userName2;

    var url = this.baseURL + 'userIDComponents' + params;

    return this.client.get<UserIDComponents[]>(url);
  }

  public putUserIDs(data: any): Observable<number> {

    console.log('Putting the new user ID components');

    var url = this.baseURL + 'userIDComponents';

    return this.client.put<number>(url, data);
  }

  public postNewUser(data: any): Observable<number> {

    console.log('Posting the user ID components');

    var url = this.baseURL + 'userIDComponents';

    return this.client.post<number>(url, data);
  }

  public deleteSpecifiedUser(userID: string, userName: string): Observable<number> {

    console.log('Deleting the specified user ID components');

    var delimeter = '/';
    var patam1 = userID;
    var param2 = userName;

    var params = delimeter + userID + delimeter + userName;

    var url = this.baseURL + 'userIDComponents' + params;

    return this.client.delete<number>(url);
  }

}

interface UserIDComponents {
  currentCount1: number;
  currentCount2: number;
}

