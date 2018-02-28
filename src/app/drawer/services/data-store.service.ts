import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IDrawerAppState } from '../store';
import { DrObject } from '../models/dr-object';

@Injectable()
export class DataStoreService {

  constructor(private ngRedux: NgRedux<IDrawerAppState>) { }

  getElements(): DrObject[] {
    return  this.ngRedux.getState().elements.present;
  }
}
