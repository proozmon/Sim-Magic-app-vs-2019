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
  myValueDisplayDescriptiveResults: boolean;
  myValueDisplayPredictiveResults: boolean;
  myValueDisplayPrescriptiveRecommendations: boolean;

  constructor() { }

  ngOnInit() {
    this.myValueHowToDisplayReports = true;
    this.myValueDisplayOperatingCosts = false;
    this.myValueDisplayNetWorth = false;
    this.myValueDisplayRiskAnalysis = false;
    this.myValueDisplayDescriptiveResults = false;
    this.myValueDisplayPredictiveResults = false;
    this.myValueDisplayPrescriptiveRecommendations = false;
  }

  showActive(tab: number) {

    switch (tab) {
      case 0:
        this.myValueHowToDisplayReports = true;
        this.myValueDisplayOperatingCosts = false;
        this.myValueDisplayNetWorth = false;
        this.myValueDisplayRiskAnalysis = false;
        this.myValueDisplayDescriptiveResults = false;
        this.myValueDisplayPredictiveResults = false;
        this.myValueDisplayPrescriptiveRecommendations = false;
        break;
      case 1:
        this.myValueHowToDisplayReports = false;
        this.myValueDisplayOperatingCosts = true;
        this.myValueDisplayNetWorth = false;
        this.myValueDisplayRiskAnalysis = false;
        this.myValueDisplayDescriptiveResults = false;
        this.myValueDisplayPredictiveResults = false;
        this.myValueDisplayPrescriptiveRecommendations = false;
        break;
      case 2:
        this.myValueHowToDisplayReports = false;
        this.myValueDisplayOperatingCosts = false;
        this.myValueDisplayNetWorth = true;
        this.myValueDisplayRiskAnalysis = false;
        this.myValueDisplayDescriptiveResults = false;
        this.myValueDisplayPredictiveResults = false;
        this.myValueDisplayPrescriptiveRecommendations = false;
        break;
      case 3:
        this.myValueHowToDisplayReports = false;
        this.myValueDisplayOperatingCosts = false;
        this.myValueDisplayNetWorth = false;
        this.myValueDisplayRiskAnalysis = true;
        this.myValueDisplayDescriptiveResults = false;
        this.myValueDisplayPredictiveResults = false;
        this.myValueDisplayPrescriptiveRecommendations = false;
        break;
      case 4:
        this.myValueHowToDisplayReports = false;
        this.myValueDisplayOperatingCosts = false;
        this.myValueDisplayNetWorth = false;
        this.myValueDisplayRiskAnalysis = false;
        this.myValueDisplayDescriptiveResults = true;
        this.myValueDisplayPredictiveResults = false;
        this.myValueDisplayPrescriptiveRecommendations = false;
        break;
      case 5:
        this.myValueHowToDisplayReports = false;
        this.myValueDisplayOperatingCosts = false;
        this.myValueDisplayNetWorth = false;
        this.myValueDisplayRiskAnalysis = false;
        this.myValueDisplayDescriptiveResults = false;
        this.myValueDisplayPredictiveResults = true;
        this.myValueDisplayPrescriptiveRecommendations = false;
        break;
      case 6:
        this.myValueHowToDisplayReports = false;
        this.myValueDisplayOperatingCosts = false;
        this.myValueDisplayNetWorth = false;
        this.myValueDisplayRiskAnalysis = false;
        this.myValueDisplayDescriptiveResults = false;
        this.myValueDisplayPredictiveResults = false;
        this.myValueDisplayPrescriptiveRecommendations = true;
        break;
      default:
        break;
    }
  }
}
