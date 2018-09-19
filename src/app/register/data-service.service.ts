import { Injectable } from '@angular/core';
import { Country } from './country';
import { State } from './state';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  getCountries() {
    return [
      new Country(1, 'USA' ),
      new Country(2, 'Egypt' ),
      new Country(3, 'Australia' )
    ];
  }

  getStates() {
    return [
      new State(1, 1, 'Arizona' ),
      new State(2, 1, 'Alaska' ),
      new State(3, 1, 'Florida'),
      new State(4, 1, 'Hawaii'),
      new State(5, 2, 'Talbia' ),
      new State(6, 2, 'Giza'),
      new State(7, 2, 'Haram' ),
      new State(8, 3, 'Queensland' ),
      new State(9, 3, 'South Australia' ),
      new State(10, 3, 'Tasmania')
    ];
  }
  constructor() { }
}
