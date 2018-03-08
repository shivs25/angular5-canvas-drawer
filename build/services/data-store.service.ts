import { Injectable, EventEmitter } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as _ from "lodash";
import { IDrawerAppState, IElementState } from '../store';
import { DrObject } from '../models/dr-object';
import { BoundingBox } from '../models/bounding-box';
import {
  CHANGE_OBJECTS_PROPERTIES, 
  SET_ELEMENTS, 
  SELECT_OBJECTS, 
  END_EDIT, 
  BEGIN_EDIT,
  ADD_OBJECTS, 
  SET_TOOL, 
  REMOVE_OBJECTS,
  CLEAR_OBJECTS,
  REPLACE_OBJECTS,
  INIT_ELEMENTS
} from '../actions';
import { ActionCreators } from 'redux-undo';
import { EditorToolType, DrType } from '../models/enums';
import { DrRect } from '../models/dr-rect';
import { DrawerObjectHelperService } from '../services/drawer-object-helper.service';
import { MouseEventData } from '../models/mouse-event-data';
import { ChangeHelperService } from './change-helper.service';
import { DrStyle } from '../models/dr-style';
import { DrGroupedObject, createDrGroupedObject } from '../models/dr-grouped-object';
import { cloneDeep, updateChildItemIds } from '../utilities';

const DUPLICATE_OFFSET_AMOUNT = 10;

@Injectable()
export class DataStoreService {

  undid: EventEmitter<void> = new EventEmitter<void>();
  redid: EventEmitter<void> = new EventEmitter<void>();

  selectionChanged: EventEmitter<DrObject[]> = new EventEmitter<DrObject[]>();
  selectedBoundsChanged: EventEmitter<BoundingBox> = new EventEmitter<BoundingBox>();
  editingChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  objectsAdded: EventEmitter<DrObject[]> = new EventEmitter<DrObject[]>();

  private _duplicateOffset: number = 1;

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
    this._ngRedux.dispatch({ type: INIT_ELEMENTS, elements: elements });
    this._ngRedux.dispatch({ type: SELECT_OBJECTS, items: [], selectedBounds: null });
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
  public alignObjectsLeft(items: DrObject[]):void {
    if (items.length > 1) {
      this.alignObjects(items, 0);
    }
  }

  public alignObjectsRight(items: DrObject[]):void {
    if (items.length > 1) {
      this.alignObjects(items, 2);
    }
  }

  public alignObjectsCenter(items: DrObject[]):void {
    if (items.length > 1) {
      this.alignObjects(items, 1);
    }
  }

  public alignObjectsTop(items: DrObject[]):void {
    if (items.length > 1) {
      this.alignObjects(items, 3);
    }
  }

  public alignObjectsMiddle(items: DrObject[]):void {
    if (items.length > 1) {
      this.alignObjects(items, 4);
    }
  }

  public alignObjectsBottom(items: DrObject[]):void {
    if (items.length > 1) {
      this.alignObjects(items, 5);
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
        type: CHANGE_OBJECTS_PROPERTIES, 
        changes: changes
      });
      this.resetSelection();
    }
    this._duplicateOffset = 1;
  }

  public setVisibility(items: DrObject[], visibility: boolean): void {
    let ids: number[] = items.map((x:DrObject) => x.id);
    let newSelectedObjects: DrObject[] = this.selectedObjects.filter((x: DrObject) => ids.indexOf(x.id) < 0);
    let b: BoundingBox =  newSelectedObjects.length > 0 ? this._objectHelperService.getBoundingBox(newSelectedObjects) : null;

    let changes: any[] = [];
    for(let o of items) {
      changes.push({ id: o.id, changes: { visible: visibility }});
    }

    this._ngRedux.dispatch({
      type: CHANGE_OBJECTS_PROPERTIES,
      changes: changes
    });
    this.selectObjects(newSelectedObjects);
    this._duplicateOffset = 1;
  }

  public setStyles(items: DrObject[], newStyle: DrStyle): void {
    this._ngRedux.dispatch({
      type: CHANGE_OBJECTS_PROPERTIES,
      changes: items.map((x: DrObject) => { 
        return { id: x.id, changes: Object.assign({}, newStyle) }; 
      })
    });
    this.resetSelection();
    this._duplicateOffset = 1;
  }

  public moveObjectsDown(items: DrObject[]): void {

    let indices: any[] = [];
    
    for(let o of items) {
      indices.push({
        id: o.id,
        index: this.getObjectIndex(o),
        item: o
      });
    }
    
    let min: number = Math.min(...indices.map((b: any) => b.index)) - 1;
    if (min < 0) { min = 0 };
    let idsToExclude = indices.map((x: any) => x.id);
    let elements: DrObject[] = [
      ...this.elements.slice(0, min).filter((x: any) => idsToExclude.indexOf(x.id) < 0),
      ...indices.sort((a, b) => a.index - b.index).map((x: any) => x.item),
      ...this.elements.slice(min).filter((x: any) => idsToExclude.indexOf(x.id) < 0)
    ];

    if (!this.areElementArraysTheSameOrder(elements, this.elements)) {
      this._ngRedux.dispatch({
        type: SET_ELEMENTS,
        elements: elements
      });
    }
    
    this._duplicateOffset = 1;
  }

  public moveObjectsUp(items: DrObject[]): void {
    let indices: any[] = [];
    
    for(let o of items) {
      indices.push({
        id: o.id,
        index: this.getObjectIndex(o),
        item: o
      });
    }
    
    let max: number = Math.max(...indices.map((b: any) => b.index)) + 1;
    if (max > this.elements.length - 1) {
      max = this.elements.length - 1;
    }

    let idsToExclude = indices.map((x: any) => x.id);
    let elements: DrObject[] = [
      ...this.elements.slice(0, max + 1).filter((x: any) => idsToExclude.indexOf(x.id) < 0),
      ...indices.sort((a, b) => a.index - b.index).map((x: any) => x.item),
      ...this.elements.slice(max + 1).filter((x: any) => idsToExclude.indexOf(x.id) < 0)
    ];

    if (!this.areElementArraysTheSameOrder(elements, this.elements)) {
      this._ngRedux.dispatch({
        type: SET_ELEMENTS,
        elements: elements
      });
    }
    
    
    this._duplicateOffset = 1;
  }

  public addObjects(items: DrObject[]): void {
    this._ngRedux.dispatch({
      type: ADD_OBJECTS,
      newItems: items
    });
    this.objectsAdded.emit(items);
    this._duplicateOffset = 1;
  }

  public removeObjects(items: DrObject[]): void {
    let ids: number[] = items.map((x:DrObject) => x.id);
    let newSelectedObjects: DrObject[] = this.selectedObjects.filter((x: DrObject) => ids.indexOf(x.id) < 0);
    let b: BoundingBox =  newSelectedObjects.length > 0 ? this._objectHelperService.getBoundingBox(newSelectedObjects) : null;
    this._ngRedux.dispatch({
      type: REMOVE_OBJECTS,
      ids: items.map((x: any) => x.id)
    });
    this.selectObjects(newSelectedObjects);
    this._duplicateOffset = 1;
  }


  public groupObjects(items: DrObject[]): void {
    let itemToAdd: DrGroupedObject = createDrGroupedObject({
      id: this.getNextId(),
      objects: items
    });


    let groupedObject: DrObject;
    let highZIndex: number = 0;
    let indexOf: number;
    for(let i of items) {
        groupedObject = this.elements.find((t: any) => i.id === t.id);
        if (groupedObject) {
            indexOf = this.elements.indexOf(groupedObject);
            if (indexOf > highZIndex) {
              highZIndex = indexOf;
            }
        }
    }

    this._ngRedux.dispatch({
      type: REPLACE_OBJECTS,
      itemsToRemove: items,
      itemsToAdd: [itemToAdd],
      zIndex: highZIndex
    });
    this.selectObjects([itemToAdd]);
    this._duplicateOffset = 1;
  }

  public ungroupObject(item: DrGroupedObject): void {

    this._ngRedux.dispatch({
      type: REPLACE_OBJECTS,
      itemsToRemove: [item],
      itemsToAdd: item.objects,
      zIndex: this.elements.indexOf(item)
    });
    this.selectObjects(item.objects);
    this._duplicateOffset = 1;
  }

 
  public duplicateObjects(items: DrObject[]): void {
    let newItems: DrObject[] = [];
    let b: BoundingBox;
    let newB: BoundingBox;

    let nextId: number = this.getNextId();
    let newItem: DrObject;

    let i: DrObject;

    for(i of items) {
      b = this._objectHelperService.getBoundingBox([i]);

      newB = Object.assign({}, b, {
        x: b.x + (this._duplicateOffset * DUPLICATE_OFFSET_AMOUNT),
        y: b.y + (this._duplicateOffset * DUPLICATE_OFFSET_AMOUNT)
      });

      newItem = Object.assign({}, cloneDeep(i), this._changeService.getBoundsChanges(i, newB, b), { id: nextId++ });
      nextId = updateChildItemIds(newItem, nextId);

      newItems.push(newItem);
    }

    this._ngRedux.dispatch({ type: ADD_OBJECTS, newItems: newItems });
    this._duplicateOffset++;
  }

  public clearObjects(): void {
    this._ngRedux.dispatch({ type: CLEAR_OBJECTS });
    this.selectObjects([]);
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

  private areElementArraysTheSameOrder(arr1: DrObject[], arr2: DrObject[]) {
    let returnValue: boolean = true;

    if (arr1.length === arr2.length) {
      for(let i = 0; i < arr1.length; i++) {
        if (arr1[i].id !== arr2[i].id) {
          returnValue = false;
          break;
        }
      }
    }
    else {
      returnValue = false;
    }

    return  returnValue;
  }

  private alignObjects(items: DrObject[], alignment: number) {
    let boundingBoxes: any = [];

    for(let i of items) {
      boundingBoxes.push({
        item: i,
        bounds: this._objectHelperService.getBoundingBox([i])
      });
    }

    let changes: any = [];
    switch(alignment) {
      case 0: {
          let left: number = Math.min(...boundingBoxes.map((b: any) => b.bounds.x));

          for(let o of boundingBoxes) {
            o.newBounds = Object.assign({}, o.bounds, { x: left });
          }
        }
        break;
      case 1: {
          let left: number = Math.min(...boundingBoxes.map((b: any) => b.bounds.x));
          let right: number = Math.max(...boundingBoxes.map((b: any) => b.bounds.x + b.bounds.width));
          let middle: number = (left + right) / 2;

          for(let o of boundingBoxes) {
            o.newBounds = Object.assign({}, o.bounds, { x: middle - o.bounds.width / 2});
          }
        }
        break;
      case 2: {
          let right: number = Math.max(...boundingBoxes.map((b: any) => b.bounds.x + b.bounds.width));
    
          for(let o of boundingBoxes) {
            o.newBounds = Object.assign({}, o.bounds, { x: right - o.bounds.width });
          }
        }
        break;
      case 3: {
          let top: number = Math.min(...boundingBoxes.map((b: any) => b.bounds.y));
    
          for(let o of boundingBoxes) {
            o.newBounds = Object.assign({}, o.bounds, { y: top });
          }
        }
        break;
      case 4: {
          let top: number = Math.min(...boundingBoxes.map((b: any) => b.bounds.y));
          let bottom: number = Math.max(...boundingBoxes.map((b: any) => b.bounds.y + b.bounds.height));
          let middle: number = (top + bottom) / 2;

          for(let o of boundingBoxes) {
            o.newBounds = Object.assign({}, o.bounds, { y: middle - o.bounds.height / 2 });
          }
        }
        break;
      case 5: {
          let bottom: number = Math.max(...boundingBoxes.map((b: any) => b.bounds.y + b.bounds.height));
    
          for(let o of boundingBoxes) {
            o.newBounds = Object.assign({}, o.bounds, { y: bottom - o.bounds.height });
          }
        }
        break;
    }

    for(let o of boundingBoxes) {
      changes.push({
        id: o.item.id,
        changes: this._changeService.getBoundsChanges(o.item, o.newBounds, o.bounds)
      });
    }

    let newBounds: BoundingBox = this._objectHelperService.getBoundingBoxForBounds(boundingBoxes.map((x:any) => x.newBounds));

    this._ngRedux.dispatch({ 
      type: CHANGE_OBJECTS_PROPERTIES,
      changes: changes
    });

    this.resetSelection();
    this._duplicateOffset = 1;
  }

  private resetSelection(): void {
    let newArray: DrObject[] = [];
    for(let o of this.selectedObjects) {
      newArray.push(this.elements.find((t: DrObject) => t.id === o.id));
    }
    this._ngRedux.dispatch({
      type: SELECT_OBJECTS,
      items: newArray,
      selectedBounds: this._objectHelperService.getBoundingBox(newArray)
    });
    this.selectedBoundsChanged.emit(this.selectedBounds);
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

  //=========Supporting Functions=========
  public getObjects(ids: number[]): DrObject[] {
    return this._objectHelperService.getObjects(ids, this.elements);
  }
}
