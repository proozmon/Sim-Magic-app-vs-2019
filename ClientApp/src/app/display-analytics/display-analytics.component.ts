import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-analytics',
  templateUrl: './display-analytics.component.html'
})

export class DisplayAnalyticsComponent implements OnInit {

  myValueHowToDisplayAnalytics: boolean;
  myValueDisplayDescriptiveAnalyticsResults: boolean;
  myValueDisplayPredictiveAnalyticsResults: boolean;
  myValueDisplayPrescriptiveAnalyticsRecommendations: boolean;

  constructor() { }

  ngOnInit() {
    this.myValueHowToDisplayAnalytics = true;
    this.myValueDisplayDescriptiveAnalyticsResults = false;
    this.myValueDisplayPredictiveAnalyticsResults = false;
    this.myValueDisplayPrescriptiveAnalyticsRecommendations = false;
  }

  showActive(tab: number) {

    switch (tab) {
      case 1:
        this.myValueHowToDisplayAnalytics = true;
        this.myValueDisplayDescriptiveAnalyticsResults = false;
        this.myValueDisplayPredictiveAnalyticsResults = false;
        this.myValueDisplayPrescriptiveAnalyticsRecommendations = false;
        break;
      case 2:
        this.myValueHowToDisplayAnalytics = false;
        this.myValueDisplayDescriptiveAnalyticsResults = true;
        this.myValueDisplayPredictiveAnalyticsResults = false;
        this.myValueDisplayPrescriptiveAnalyticsRecommendations = false;
        break;
      case 3:
        this.myValueHowToDisplayAnalytics = false;
        this.myValueDisplayDescriptiveAnalyticsResults = false;
        this.myValueDisplayPredictiveAnalyticsResults = true;
        this.myValueDisplayPrescriptiveAnalyticsRecommendations = false;
        break;
      case 4:
        this.myValueHowToDisplayAnalytics = false;
        this.myValueDisplayDescriptiveAnalyticsResults = false;
        this.myValueDisplayPredictiveAnalyticsResults = false;
        this.myValueDisplayPrescriptiveAnalyticsRecommendations = true;
        break;
      default:
        break;
    }
  }
}
