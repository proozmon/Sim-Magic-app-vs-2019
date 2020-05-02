import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-tabs-demo',
  templateUrl: './content-tabs-demo.component.html'
})

export class ContentTabsDemoComponent implements OnInit {

  tabs: any;

  myValueHome: boolean;
  myValueProfile: boolean;
  myValueContact: boolean;

  constructor() { }

  ngOnInit() {

    this.tabs = [
      { title: 'About', content: 'This is the About tab' },
      { title: 'Blog', content: 'This is our blog' },
      { title: 'Contact us', content: 'Contact us here' },
    ];

    this.myValueHome = true;
    this.myValueProfile = false;
    this.myValueContact = false;
  }

  showActive(tab: number) {

    switch (tab) {
      case 1: 
        this.myValueHome = true;
        this.myValueProfile = false;
        this.myValueContact = false;
        break;
      case 2:
        this.myValueHome = false;
        this.myValueProfile = true;
        this.myValueContact = false;
        break;
      case 3: 
        this.myValueHome = false;
        this.myValueProfile = false;
        this.myValueContact = true;
        break;
      default:
        break;
    }
  }
}
