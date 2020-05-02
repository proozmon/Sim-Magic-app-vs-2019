import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})

export class CounterComponent {

  public currentCountArray: CounterComponents[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<CounterComponents[]>(baseUrl + 'counterComponents')
      .subscribe(result => {
        this.currentCountArray = result;
      }, error => console.error(error));
  }

  public currentCount1 = 0;
  public currentCount2 = 0;

  public incrementCounter() {
    var thing = this.currentCountArray;
    for (var i in thing) {
      thing[i].currentCount1++;
      thing[i].currentCount2 += 2;

      this.currentCount1 = thing[i].currentCount1;
      this.currentCount2 = thing[i].currentCount2;
    }
    this.currentCountArray = thing;

  }

}

interface CounterComponents {
  currentCount1: number;
  currentCount2: number;
}

