import { Injectable, EventEmitter } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IDrawerAppState, IElementState } from '../store';
import { DrObject } from '../models/dr-object';
import { BoundingBox } from '../models/bounding-box';
import { CHANGE_OBJECT_BOUNDS, SET_ELEMENTS, SELECT_OBJECTS } from '../actions';
import { ActionCreators } from 'redux-undo';
import { EditorToolType } from '../models/enums';

@Injectable()
export class DataStoreService {

  public clickedObject: EventEmitter<DrObject> = new EventEmitter<DrObject>();
  public mouseDownObject: EventEmitter<DrObject> = new EventEmitter<DrObject>();
  public mouseMoveObject: EventEmitter<DrObject> = new EventEmitter<DrObject>();
  public mouseUpObject: EventEmitter<DrObject> = new EventEmitter<DrObject>();

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

  public handleClickedObject(clickedObject: DrObject) {
    this.clickedObject.emit(clickedObject);
  }

  public handleMouseDownObject(clickedObject: DrObject) {
    this.mouseDownObject.emit(clickedObject);
  }

  public handleMouseMoveObject(clickedObject: DrObject) {
    this.mouseMoveObject.emit(clickedObject);
  }

  public handleMouseUpObject(clickedObject: DrObject) {
    this.mouseUpObject.emit(clickedObject);
  }

  public moveObject(item: DrObject, newBounds: BoundingBox): void {
    this.ngRedux.dispatch({ type: CHANGE_OBJECT_BOUNDS, id: item.id, newBounds: newBounds });
  }

  public selectObjects(items: DrObject[]): void {
    this.ngRedux.dispatch({ type: SELECT_OBJECTS, items: items});
  }

  public undo(): void {
    this.ngRedux.dispatch(ActionCreators.undo());
  }

  public redo(): void {
    this.ngRedux.dispatch(ActionCreators.redo());
  }
}
