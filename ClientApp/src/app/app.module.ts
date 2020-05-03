// import services
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// import components
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { WorkingOnSimulationsComponent } from './working-on-simulations/working-on-simulations.component';
import { DisplayReportsComponent } from './display-reports/display-reports.component';
import { DisplayAnalyticsComponent } from './display-analytics/display-analytics.component';
import { DisplaySimulationsComponent } from './display-simulations/display-simulations.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    WelcomePageComponent,
    WorkingOnSimulationsComponent,
    DisplayReportsComponent,
    DisplayAnalyticsComponent,
    DisplaySimulationsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([

      // bypass the Home component on startup and go straight to the Welcome page
      //{ path: '', component: HomeComponent, pathMatch: 'full' },

      // define routes
      { path: '', component: WelcomePageComponent, pathMatch: 'full' },
      { path: 'welcome-page', component: WelcomePageComponent },
      { path: 'working-on-simulations', component: WorkingOnSimulationsComponent },
      { path: 'display-reports', component: DisplayReportsComponent },
      { path: 'display-analytics', component: DisplayAnalyticsComponent },
      { path: 'display-simulations', component: DisplaySimulationsComponent },
    ])
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
