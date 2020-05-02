import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcomp-page',
  templateUrl: './welcome-page.component.html'
})

export class WelcomePageComponent implements OnInit {

  myValueHome: boolean;
  myValueAbout: boolean;
  myValueProducts: boolean;
  myValueEditions: boolean;
  myValueCustomizedSolutions: boolean;
  myValueContactUs: boolean;

  constructor() { }

  ngOnInit() {

    this.myValueHome = true;
    this.myValueAbout = false;
    this.myValueProducts = false;
    this.myValueEditions = false;
    this.myValueCustomizedSolutions = false;
    this.myValueContactUs = false;
  }

  showActive(tab: number) {

    switch (tab) {
      case 1:
        this.myValueHome = true;
        this.myValueAbout = false;
        this.myValueProducts = false;
        this.myValueEditions = false;
        this.myValueCustomizedSolutions = false;
        this.myValueContactUs = false;
        break;
      case 2:
        this.myValueHome = false;
        this.myValueAbout = true;
        this.myValueProducts = false;
        this.myValueEditions = false;
        this.myValueCustomizedSolutions = false;
        this.myValueContactUs = false;
        break;
      case 3:
        this.myValueHome = false;
        this.myValueAbout = false;
        this.myValueProducts = true;
        this.myValueEditions = false;
        this.myValueCustomizedSolutions = false;
        this.myValueContactUs = false;
        break;
      case 4:
        this.myValueHome = false;
        this.myValueAbout = false;
        this.myValueProducts = false;
        this.myValueEditions = true;
        this.myValueCustomizedSolutions = false;
        this.myValueContactUs = false;
        break;
      case 5:
        this.myValueHome = false;
        this.myValueAbout = false;
        this.myValueProducts = false;
        this.myValueEditions = false;
        this.myValueCustomizedSolutions = true;
        this.myValueContactUs = false;
        break;
      case 6:
        this.myValueHome = false;
        this.myValueAbout = false;
        this.myValueProducts = false;
        this.myValueEditions = false;
        this.myValueCustomizedSolutions = false;
        this.myValueContactUs = true;
        break;
      default:
        break;
    }
  }
}
