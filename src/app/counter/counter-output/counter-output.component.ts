import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { getCounter } from '../state/counter.selectors';

import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
})
export class CounterOutputComponent implements OnInit {
  // @Input() counter: any;
  counter: number = 0;
  counter$!: Observable<number>;
  counterSubscription!: Subscription;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // this.counterSubscription = this.store
    //   .select(getCounter)
    //   .subscribe((num) => {
    //     this.counter = num;
    //   });

    this.counter$ = this.store.select(getCounter);
  }

  // ngOnDestroy(): void {
  //   if (this.counterSubscription) {
  //     this.counterSubscription.unsubscribe();
  //   }
  // }
}
