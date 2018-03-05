import { Injectable, EventEmitter } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IDrawerAppState, IElementState } from '../store';
import { DrObject } from '../models/dr-object';
import { BoundingBox } from '../models/bounding-box';
import { 
  CHANGE_OBJECT_BOUNDS, 
  CHANGE_OBJECTS_BOUNDS, 
  SET_ELEMENTS, 
  SELECT_OBJECTS, 
  END_EDIT, 
  BEGIN_EDIT, 
  CHANGE_STYLE, 
  CHANGE_Z_INDEX, 
  ADD_OBJECT, 
  SET_TOOL, 
  GROUP_OBJECTS,
  UNGROUP_OBJECT
} from '../actions';
import { ActionCreators } from 'redux-undo';
import { EditorToolType } from '../models/enums';
import { DrRect } from '../models/dr-rect';
import { DrawerObjectHelperService } from '../services/drawer-object-helper.service';
import { MouseEventData } from '../models/mouse-event-data';
import { ChangeHelperService } from './change-helper.service';
import { DrStyle } from '../models/dr-style';
import { DrGroupedObject } from '../models/dr-grouped-object';

@Injectable()
export class DataStoreService {

  undid: EventEmitter<void> = new EventEmitter<void>();
  redid: EventEmitter<void> = new EventEmitter<void>();

  selectionChanged: EventEmitter<DrObject[]> = new EventEmitter<DrObject[]>();
  editingChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  objectsAdded: EventEmitter<DrObject[]> = new EventEmitter<DrObject[]>();

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

  public set selectedTool(tool: EditorToolType) {
    this._ngRedux.dispatch({ type: SET_TOOL, tool: tool });
  }

  public get isEditing(): boolean {
    return this._ngRedux.getState().editingState.isEditing;
  }

  //=========Actions=========
  public moveObject(item: DrObject, newBounds: BoundingBox): void {
    let b: BoundingBox = this.selectedBounds;

    if (null === b || (
      b.x !== newBounds.x ||
      b.y !== newBounds.y ||
      b.width !== newBounds.width ||
      b.height !== newBounds.height
    )) {
      this._ngRedux.dispatch({ 
        type: CHANGE_OBJECT_BOUNDS, 
        id: item.id, 
        changes: this._changeService.getBoundsChanges(item, newBounds, this.selectedBounds),
        newBounds: newBounds
      });
    }
    
  }

  public moveObjects(items: DrObject[], newBounds: BoundingBox): void {
    let b: BoundingBox = this.selectedBounds;

    if (null === b || (
      b.x !== newBounds.x ||
      b.y !== newBounds.y ||
      b.width !== newBounds.width ||
      b.height !== newBounds.height
    )) {

      let changes: any[] = [];
      for(let i of items) {
        changes.push({ id: i.id, changes: this._changeService.getBoundsChanges(i, newBounds, this.selectedBounds) });
      }
      this._ngRedux.dispatch({ 
        type: CHANGE_OBJECTS_BOUNDS, 
        changes: changes,
        newBounds: newBounds
      });
    }
    
  }

  public setStyle(item: DrObject, newStyle: DrStyle): void {
    this._ngRedux.dispatch({
      type: CHANGE_STYLE,
      id: item.id,
      newStyle: newStyle
    });
  }

  public moveObjectDown(item: DrObject): void {
    let index: number = this.getObjectIndex(item);
    if (index > 0) {
      this._ngRedux.dispatch({
        type: CHANGE_Z_INDEX,
        id: item.id,
        newIndex: index - 1
      });
    }
  }

  public moveObjectUp(item: DrObject): void {
    let index: number = this.getObjectIndex(item);
    if (index < this.elements.length - 1) {
      this._ngRedux.dispatch({
        type: CHANGE_Z_INDEX,
        id: item.id,
        newIndex: index + 1
      });
    }
  }

  public addObject(item: DrObject): void {
    this._ngRedux.dispatch({
      type: ADD_OBJECT,
      newItem: item
    });
    this.objectsAdded.emit([item]);
  }

  public groupObjects(items: DrObject[]): void {
    this._ngRedux.dispatch({
      type: GROUP_OBJECTS,
      items: items,
      selectedBounds: this._objectHelperService.getBoundingBox(items),
      nextId: this.getNextId()
    });
    this.selectionChanged.emit(this.selectedObjects);
  }

  public ungroupObject(item: DrGroupedObject): void {
    this._ngRedux.dispatch({
      type: UNGROUP_OBJECT,
      item: item,
      selectedBounds: this._objectHelperService.getBoundingBox(item.objects)
    });
    this.selectionChanged.emit(this.selectedObjects);
  }

  private getObjectIndex(item: DrObject): number {
    let i: DrObject = this.elements.find((t:any) => t.id === item.id);
    let index = this.elements.indexOf(i);
    return index;
  }

  private getNextId(): number {
    return 0 === this.elements.length ? 1 :
          Math.max(...this.elements.map(o => o.id)) + 1;
  }

  //=========Selection========
  public selectObjects(items: DrObject[]): void {
    this._ngRedux.dispatch({ 
      type: SELECT_OBJECTS, 
      items: items, 
      selectedBounds: items.length > 0 ? this._objectHelperService.getBoundingBox(items) : null
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
