import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-working-on-simulations',
  templateUrl: './working-on-simulations.component.html'
})

export class WorkingOnSimulationsComponent implements OnInit {

  myValueWorkingOnSimulations: boolean;
  myValueGettingStarted: boolean;
  myValueSelectApplication: boolean;
  myValueSystemParameters: boolean;
  myValueGraphicalParameters: boolean;

  constructor() { }

  ngOnInit() {
    this.myValueWorkingOnSimulations = true;
    this.myValueGettingStarted = false;
    this.myValueSelectApplication = false;
    this.myValueSystemParameters = false;
    this.myValueGraphicalParameters = false;
  }

  showActive(tab: number) {

    switch (tab) {
      case 1:
        this.myValueWorkingOnSimulations = true;
        this.myValueGettingStarted = false;
        this.myValueSelectApplication = false;
        this.myValueSystemParameters = false;
        this.myValueGraphicalParameters = false;
        break;
      case 2:
        this.myValueWorkingOnSimulations = false;
        this.myValueGettingStarted = true;
        this.myValueSelectApplication = false;
        this.myValueSystemParameters = false;
        this.myValueGraphicalParameters = false;
        break;
      case 3:
        this.myValueWorkingOnSimulations = false;
        this.myValueGettingStarted = false;
        this.myValueSelectApplication = true;
        this.myValueSystemParameters = false;
        this.myValueGraphicalParameters = false;
        break;
      case 4:
        this.myValueWorkingOnSimulations = false;
        this.myValueGettingStarted = false;
        this.myValueSelectApplication = false;
        this.myValueSystemParameters = true;
        this.myValueGraphicalParameters = false;
        break;
      case 5:
        this.myValueWorkingOnSimulations = false;
        this.myValueGettingStarted = false;
        this.myValueSelectApplication = false;
        this.myValueSystemParameters = false;
        this.myValueGraphicalParameters = true;
        break;
      default:
        break;
    }
  }
}
