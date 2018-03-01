import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IDrawerAppState, IElementState } from '../store';
import { DrObject } from '../models/dr-object';
import { BoundingBox } from '../models/bounding-box';
import { CHANGE_OBJECT_BOUNDS, SET_ELEMENTS } from '../actions';
import { ActionCreators } from 'redux-undo';
import { EditorToolType } from '../models/enums';

@Injectable()
export class DataStoreService {

  constructor(private ngRedux: NgRedux<IDrawerAppState>) { }

  public get elements(): DrObject[] {
    return this.ngRedux.getState().elementState.present.elements;
  }

  public set elements(elements: DrObject[]) {
    this.ngRedux.dispatch({ type: SET_ELEMENTS, elements: elements });
  }

  public get selectedIds(): number[] { 
    return this.ngRedux.getState().elementState.present.selectedIds;
  }

  public get selectedTool(): EditorToolType {
    return  this.ngRedux.getState().elementState.present.selectedTool;
  }

  public moveObject(item: DrObject, newBounds: BoundingBox): void {
    this.ngRedux.dispatch({ type: CHANGE_OBJECT_BOUNDS, id: item.id, newBounds: newBounds });
  }

  public undo(): void {
    this.ngRedux.dispatch(ActionCreators.undo());
  }

  public redo(): void {
    this.ngRedux.dispatch(ActionCreators.redo());
  }
}
