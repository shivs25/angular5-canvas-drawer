import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IDrawerAppState } from '../store';
import { DrObject } from '../models/dr-object';
import { BoundingBox } from '../models/bounding-box';
import { CHANGE_OBJECT_BOUNDS } from '../actions';

@Injectable()
export class DataStoreService {

  constructor(private ngRedux: NgRedux<IDrawerAppState>) { }

  getElements(): DrObject[] {
    return  this.ngRedux.getState().elements.present;
  }

  moveObject(item: DrObject, newBounds: BoundingBox): void {
    this.ngRedux.dispatch({ type: CHANGE_OBJECT_BOUNDS, id: item.id, newBounds: newBounds });
  }
}
