import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeName, customIncrement } from '../state/counter.actions';
import { getName } from '../state/counter.selectors';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css'],
})
export class CustomCounterInputComponent implements OnInit {
  value: number = 0;
  name: string = '';

  constructor(private store: Store<{ counter: CounterState }>) {}

  ngOnInit(): void {
    this.store.select(getName).subscribe((name) => {
      this.name = name;
    });
  }

  onAdd() {
    this.store.dispatch(customIncrement({ value: +this.value }));
    // console.log(this.value);
  }

  onChangeName() {
    this.store.dispatch(changeName());
  }
}
