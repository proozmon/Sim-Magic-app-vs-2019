import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-simulations',
  templateUrl: './display-simulations.component.html'
})

export class DisplaySimulationsComponent implements OnInit {

  myValueHowToDisplaySimulations: boolean;
  myValueDisplayForecasts: boolean;
  myValueDisplayScenarios: boolean;
  myValueConfigureTwoDimensionalAnimations: boolean;
  myValueConfigureThreeDimensionalAnimations: boolean;

  constructor() { }

  ngOnInit() {
    this.myValueHowToDisplaySimulations = true;
    this.myValueDisplayForecasts = false;
    this.myValueDisplayScenarios = false;
    this.myValueConfigureTwoDimensionalAnimations = false;
    this.myValueConfigureThreeDimensionalAnimations = false;
  }

  showActive(tab: number) {

    switch (tab) {
      case 1:
        this.myValueHowToDisplaySimulations = true;
        this.myValueDisplayForecasts = false;
        this.myValueDisplayScenarios = false;
        this.myValueConfigureTwoDimensionalAnimations = false;
        this.myValueConfigureThreeDimensionalAnimations = false;
        break;
      case 2:
        this.myValueHowToDisplaySimulations = false;
        this.myValueDisplayForecasts = true;
        this.myValueDisplayScenarios = false;
        this.myValueConfigureTwoDimensionalAnimations = false;
        this.myValueConfigureThreeDimensionalAnimations = false;
        break;
      case 3:
        this.myValueHowToDisplaySimulations = false;
        this.myValueDisplayForecasts = false;
        this.myValueDisplayScenarios = true;
        this.myValueConfigureTwoDimensionalAnimations = false;
        this.myValueConfigureThreeDimensionalAnimations = false;
        break;
      case 4:
        this.myValueHowToDisplaySimulations = false;
        this.myValueDisplayForecasts = false;
        this.myValueDisplayScenarios = false;
        this.myValueConfigureTwoDimensionalAnimations = true;
        this.myValueConfigureThreeDimensionalAnimations = false;
        break;
      case 5:
        this.myValueHowToDisplaySimulations = false;
        this.myValueDisplayForecasts = false;
        this.myValueDisplayScenarios = false;
        this.myValueConfigureTwoDimensionalAnimations = false;
        this.myValueConfigureThreeDimensionalAnimations = true;
        break;
      default:
        break;
    }
  }
}
