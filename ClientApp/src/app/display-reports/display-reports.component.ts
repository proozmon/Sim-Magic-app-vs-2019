import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-reports',
  templateUrl: './display-reports.component.html'
})

export class DisplayReportsComponent implements OnInit {

  myValueHowToDisplayReports: boolean;
  myValueDisplayOperatingCosts: boolean;
  myValueDisplayNetWorth: boolean;
  myValueDisplayRiskAnalysis: boolean;

  constructor() { }

  ngOnInit() {
    this.myValueHowToDisplayReports = true;
    this.myValueDisplayOperatingCosts = false;
    this.myValueDisplayNetWorth = false;
    this.myValueDisplayRiskAnalysis = false;
  }

  showActive(tab: number) {

    switch (tab) {
      case 0:
        this.myValueHowToDisplayReports = true;
        this.myValueDisplayOperatingCosts = false;
        this.myValueDisplayNetWorth = false;
        this.myValueDisplayRiskAnalysis = false;
        break;
      case 1:
        this.myValueHowToDisplayReports = false;
        this.myValueDisplayOperatingCosts = true;
        this.myValueDisplayNetWorth = false;
        this.myValueDisplayRiskAnalysis = false;
        break;
      case 2:
        this.myValueHowToDisplayReports = false;
        this.myValueDisplayOperatingCosts = false;
        this.myValueDisplayNetWorth = true;
        this.myValueDisplayRiskAnalysis = false;
        break;
      case 3:
        this.myValueHowToDisplayReports = false;
        this.myValueDisplayOperatingCosts = false;
        this.myValueDisplayNetWorth = false;
        this.myValueDisplayRiskAnalysis = true;
        break;
      default:
        break;
    }
  }
}
