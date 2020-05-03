import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { WorkingOnSimulationsComponent } from './working-on-simulations/working-on-simulations.component';
import { DisplayReportsComponent } from './display-reports/display-reports.component';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    WelcomePageComponent,
    WorkingOnSimulationsComponent,
    DisplayReportsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      // bypass the Home compoent and go straight to the Welcome page
      //{ path: '', component: HomeComponent, pathMatch: 'full' },
      { path: '', component: WelcomePageComponent, pathMatch: 'full' },
      { path: 'welcome-page', component: WelcomePageComponent },
      { path: 'working-on-simulations', component: WorkingOnSimulationsComponent },
      { path: 'display-reports', component: DisplayReportsComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
