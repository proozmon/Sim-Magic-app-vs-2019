import { Component, Inject, OnInit} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, range } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppComponent } from '../app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../app.dataService';

@Injectable(
)

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    // designate this class as a service provider
    // DataService
  ],
  bootstrap: [
    AppComponent
  ]
})

@Component({
  selector: 'app-userID',
  templateUrl: './userID.component.html',
  providers: [
    // designate this class as a service provider
    DataService
  ],
})  

export class UserIDComponent implements OnInit {

  // global variables
  public currentCountArray: UserIDComponents[];
  public baseURL = "";
  public client: HttpClient;
  public currentCount1 = 0;
  public currentCount2 = 0;
  public myValue = true;
  public savedSucceeded = false;
  public newUserPostRecord: UserPostRecord;
  public newUserPutRecord: UserPutRecord;

  myValueIncrement: boolean;
  myValueSave: boolean;
  myValueInsert: boolean;
  myValueDelete: boolean;

  // input parameters for get
  userName1: string;
  userName2: string;

  // saved values for get
  previousUserName1: string = '';
  previousUserName2: string = '';

  // input parameters for delete and post 
  userName: any;
  userID: any;
  password: any;

  constructor(
    // this file contains all the client methods where we call
    // the various Http restful services from the C# provider
    private dataService: DataService,
  ) {
    // load some initial values for the counter array
    // i.e. we'll use the first two user IDs by default
    // this.getAllUserIDs();
  }

  ngOnInit() {
    this.myValueIncrement = true;
    this.myValueSave = false;
    this.myValueInsert = false;
    this.myValueDelete = false;
  }

  showActive(tab: number) {

    switch (tab) {
      case 1: 
        this.myValueIncrement = true;
        this.myValueSave = false;
        this.myValueInsert = false;
        this.myValueDelete = false;
        break;
      case 2: 
        this.myValueIncrement = false;
        this.myValueSave = true;
        this.myValueInsert = false;
        this.myValueDelete = false;
        break;
      case 3: 
        this.myValueIncrement = false;
        this.myValueSave = false;
        this.myValueInsert = true;
        this.myValueDelete = false;
        break;
      case 4: 
        this.myValueIncrement = false;
        this.myValueSave = false;
        this.myValueInsert = false;
        this.myValueDelete = true;
        break;
      default:
        break;
    }
  }

  // ********************************************************
  // --------------------------------------------------------
  // methods called from the user interface begin here
  // --------------------------------------------------------
  // ********************************************************

  // load the values to be displayed for the counters,
  // using the designated or default userIDs from the DB
  public updateCounterArray() {

    // initialize local variables
    var userName1: string = '';
    var userName2: string = '';
    var previousUserName1 = this.previousUserName1;
    var previousUserName2 = this.previousUserName2;

    // check if the user has entered a name in the 1st box
    if (this.userName1 != undefined)
      userName1 = this.userName1;

    // check if the user has entered a name in the 2nd box
    if (this.userName2 != undefined)
      userName2 = this.userName2;

    // have the specified user names changed?
    var condition1 = userName1 != previousUserName1;
    var condition2 = userName2 != previousUserName2;

    // save the user names, if they've changed
    // i.e. we'll need them for compariosn next time around
    if (condition1)
      this.previousUserName1 = userName1
    if (condition2)
      this.previousUserName2 = userName2

    // get the approproiate userIDs, if the users have
    // either been newly entered or chnaged
    if (condition1 || condition2) {
      this.getSpecifiedUserIDs(userName1, userName2);
    }

    // before leaving here, let's just ensure that
    // the counter array at least has some values
    // i.e. by default we load the userIDs
    //      for the first two users
    if (this.currentCountArray == undefined)
      this.getAllUserIDs();
  }

  public incrementCounters() {

    // make sure that the counter array has the latest values
    this.updateCounterArray();

    // load the counters from the user IDs saved in the DB
    // i.e. this is meanigless, but it's convenient for testing
    var thing = this.currentCountArray;

    // *************************************************************************
    // Notes:
    // 1. The method to initialize the counters must be called from either the
    //    constructor or ngInit(), in order to show the values from the DB
    // 2. Nevertheless, the counter values that are updated from the userIDs
    //    in the DB are not displayed until after the increment button is clicked
    //    i.e. initially, the default values of 0 and 0 are still being shown
    // Todo: determine why this occurs
    //    i.e. it probably requires  a screen refresh
    // **************************************************************************

    // now increment the counters, using two different algorithms
    // i.e. this "Angular for" loop should work for any mumber of items in the current counter array
    //for (var item in thing) {

    //  // the array index for each item only goes from 0 to 1  
    //  for (var j = 0; j < 2; j++) {

    //    // increment the counters and
    //    // save the values that will be displayed for them
    //    if (thing[j].currentCount1 != undefined) {
    //      thing[j].currentCount1++;
    //      this.currentCount1 = thing[j].currentCount1;
    //    }
    //    if (thing[j].currentCount2 != undefined) {
    //      thing[j].currentCount2 += 2;
    //      this.currentCount2 = thing[j].currentCount2;
    //    }

    //  }
    //}

    // increment the counters and update the 
    // scalar values that will be displayed
    if (thing != undefined) {

      for (var j = 0; j < 2; j++) {

        if (thing[j].currentCount1 != undefined) {
          thing[j].currentCount1++;
          this.currentCount1 = thing[j].currentCount1;
        }
        if (thing[j].currentCount2 != undefined) {
          thing[j].currentCount2 += 2;
          this.currentCount2 = thing[j].currentCount2;
        }
      }

      // now save the current counter array
      // for use the next time around
      this.currentCountArray = thing;
    }

    // the following global variable is supposed to be used to selectively
    // ng-show or ng-hide the various div blocks in the html file,
    // but it's not wokring
    this.myValue = !this.myValue;

  }

  public saveCounter() {

    var thing = false;

    thing = this.putUserIDs();

    return thing;
  }

  public newUser() {

    var thing = false;

    thing = this.postNewUser();

    return thing;
  }

  public deleteUser() {

    var thing = false;

    thing = this.deleteSpecifiedUser();

    return thing;
  }

  // ********************************************************
  // --------------------------------------------------------
  // methods to get data from the dataService begin here
  // --------------------------------------------------------
  // ********************************************************

  // ********************************************
  // Notes:
  // 1. To view the results of the HttpGet calls,
  //    place a breakpoint at the line where
  //    this.currentCountArray = result
  // 2. Remember thatlambdas are asynchronous, so
  //    the results will be returned out of phase  
  // ********************************************

  // the user did not specify which userr IDs to get 
  public async getAllUserIDs() {

    var thing: UserIDComponents[];

    this.dataService.getAllUserIDs()
      .subscribe(
        (result) => {
          thing = result
            , success => alert("Done")
            , error => alert("Error");
          this.currentCountArray = thing;
        });

    return await Promise.resolve (thing);
  }

  // the user did specify which userr IDs to get 
  public async getSpecifiedUserIDs(userName1: string, userName2: string) {

    var thing: UserIDComponents[];

    this.dataService.getSpecifiedUserID(userName1, userName2)
      .subscribe(
        (result) => {
          thing = result
            , success => alert("Done")
            , error => alert("Error");
          this.currentCountArray = thing;
        });

    return await Promise.resolve (thing);
  }

  public putUserIDs() {

    var userID = [0, 0];

    // only do this if the designated user IDs
    // haven't yet been loaded from the database
    if (this.currentCountArray == undefined)
      this.updateCounterArray();

    var thing = this.currentCountArray;

    var userName1: string = '';
    var userName2: string = '';

    // check if the user has entered a name in the 1st box
    if (this.userName1 != undefined)
      userName1 = this.userName1;

    // check if the user has entered a name in the 2nd box
    if (this.userName2 != undefined)
      userName2 = this.userName2;

    // just use this for practice with traversing all
    // items in the thing list with the "Angular for"
    for (var i in thing) {
      userID[0] = thing[i].currentCount1;
      userID[1] = thing[i].currentCount2;
    }

    this.newUserPutRecord = {
      userName1: userName1,
      userName2: userName2,
      userID1: userID[0],
      userID2: userID[1],
    }

    var data = this.newUserPutRecord;

    this.dataService.putUserIDs(data)
      .subscribe(
        success => alert("Done"),
        error => alert("Error")
      );

    return true;
  }

  public postNewUser() {

    var userName: string = 'undefinedName';
    var userID: number = 800;
    var password: string = 'undefinedPassword';

    if (this.userName != undefined)
      userName = this.userName;

    if (this.userID != undefined)
      userID = parseInt(this.userID);

    if (this.password != undefined)
      password = this.password;

    this.newUserPostRecord = {
      userName: userName,
      userID: userID,
      password: password
    }

    var data = this.newUserPostRecord;

    this.dataService.postNewUser(data)
      .subscribe(
        success => alert("Done"),
        error => alert("Error")
      );

    return true;
  }

  public deleteSpecifiedUser() {

    var userName: string = 'undefinedName';
    var userID: string = '10000';

    if (this.userName != undefined)
      userName = this.userName;

    if (this.userID != undefined)
      userID = this.userID;

    this.dataService.deleteSpecifiedUser(userID, userName)
      .subscribe(
        success => alert("Done"),
        error => alert("Error")
      );

    return true;
  }

}

interface UserIDComponents {
  currentCount1: number;
  currentCount2: number;
}

interface UserPostRecord {
  userName: string;
  userID: number;
  password: string;
}

interface UserPutRecord {
  userName1: string;
  userName2
  userID1: number;
  userID2: number;
}
