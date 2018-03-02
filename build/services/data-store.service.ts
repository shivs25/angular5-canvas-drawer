import { Injectable, EventEmitter } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IDrawerAppState, IElementState } from '../store';
import { DrObject } from '../models/dr-object';
import { BoundingBox } from '../models/bounding-box';
import { CHANGE_OBJECT_BOUNDS, SET_ELEMENTS, SELECT_OBJECTS, END_EDIT, BEGIN_EDIT } from '../actions';
import { ActionCreators } from 'redux-undo';
import { EditorToolType } from '../models/enums';
import { DrRect } from '../models/dr-rect';
import { DrawerObjectHelperService } from '../services/drawer-object-helper.service';
import { MouseEventData } from '../models/mouse-event-data';
import { ChangeHelperService } from './change-helper.service';

@Injectable()
export class DataStoreService {

  undid: EventEmitter<void> = new EventEmitter<void>();
  redid: EventEmitter<void> = new EventEmitter<void>();

  clickedObject: EventEmitter<DrObject> = new EventEmitter<DrObject>();
  mouseDownObject: EventEmitter<MouseEventData> = new EventEmitter<MouseEventData>();
  mouseMoveObject: EventEmitter<MouseEventData> = new EventEmitter<MouseEventData>();
  mouseUpObject: EventEmitter<MouseEventData> = new EventEmitter<MouseEventData>();

  selectionChanged: EventEmitter<DrObject[]> = new EventEmitter<DrObject[]>();
  editingChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private _ngRedux: NgRedux<IDrawerAppState>, 
    private _objectHelperService: DrawerObjectHelperService,
    private _changeService: ChangeHelperService
  ) { }

  //=========State=========
  public get elements(): DrObject[] {
    return this._ngRedux.getState().elementState.present.elements;
  }

  public set elements(elements: DrObject[]) {
    this._ngRedux.dispatch({ type: SET_ELEMENTS, elements: elements });
  }

  public get selectedObjects(): DrObject[] { 
    return this._ngRedux.getState().elementState.present.selectedObjects;
  }

  public get selectedBounds(): BoundingBox {
    return  this._ngRedux.getState().elementState.present.selectedBounds;
  }

  public get selectedTool(): EditorToolType {
    return  this._ngRedux.getState().elementState.present.selectedTool;
  }

  public get isEditing(): boolean {
    return this._ngRedux.getState().editingState.isEditing;
  }
  //=========Events=========

  handleClickedObject(clickedObject: DrObject) {
    this.clickedObject.emit(clickedObject);
  }

  handleMouseDownObject(clickedObject: MouseEventData) {
    this.mouseDownObject.emit(clickedObject);
  }

  handleMouseMoveObject(clickedObject: MouseEventData) {
    this.mouseMoveObject.emit(clickedObject);
  }

  handleMouseUpObject(clickedObject: MouseEventData) {
    this.mouseUpObject.emit(clickedObject);
  }


  //=========Actions=========
  public moveObject(item: DrObject, newBounds: BoundingBox): void {
    this._ngRedux.dispatch({ 
      type: CHANGE_OBJECT_BOUNDS, 
      id: item.id, 
      changes: this._changeService.getBoundsChanges(item, newBounds, this.selectedBounds),
      newBounds: newBounds
    });
  }



  //=========Selection========
  public selectObjects(items: DrObject[]): void {
    this._ngRedux.dispatch({ 
      type: SELECT_OBJECTS, 
      items: items, 
      selectedBounds: this._objectHelperService.getBoundingBox(items) 
    });
    this.selectionChanged.emit(this.selectedObjects);
  }
  
  public beginEdit(): void {
    this._ngRedux.dispatch({ type: BEGIN_EDIT });
    this.editingChanged.emit(this.isEditing);
  }

  public endEdit(): void {
    this._ngRedux.dispatch({ type: END_EDIT });
    this.editingChanged.emit(this.isEditing);
  }

  //=========History=========
  public undo(): void {
    this._ngRedux.dispatch(ActionCreators.undo());
    this.undid.emit();
  }

  public redo(): void {
    this._ngRedux.dispatch(ActionCreators.redo());
    this.redid.emit();
  }
}
