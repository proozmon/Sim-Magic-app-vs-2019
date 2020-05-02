import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { UserIDComponent } from './userID/userID.component';
import { ContentTabsDemoComponent } from './content-tabs-demo/content-tabs-demo.component';
import { ContentTabComponent } from './content-tabs-demo/content-tab.component';
import { ContentTabsetComponent } from './content-tabs-demo/content-tabset.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { WorkingOnSimulationsComponent } from './working-on-simulations/working-on-simulations.component';
import { DisplayResultsComponent } from './display-results/display-results.component';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    UserIDComponent,
    FetchDataComponent,
    ContentTabsDemoComponent,
    ContentTabComponent,
    ContentTabsetComponent,
    WelcomePageComponent,
    WorkingOnSimulationsComponent,
    DisplayResultsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'userID', component: UserIDComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'content-tabs-demo', component: ContentTabsDemoComponent },
      { path: 'content-tab', component: ContentTabComponent },
      { path: 'content-tabset', component: ContentTabsetComponent },
      { path: 'welcome-page', component: WelcomePageComponent },
      { path: 'working-on-simulations', component: WorkingOnSimulationsComponent },
      { path: 'display-results', component: DisplayResultsComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
