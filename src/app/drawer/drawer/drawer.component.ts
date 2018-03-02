import { NgModule, ModuleWithProviders, Component, OnInit, ViewChild, ElementRef, ComponentFactoryResolver, Input, Output, EventEmitter } from '@angular/core';

import { DrEllipse } from '../models/dr-ellipse';
import { DrObject } from '../models/dr-object';
import { DrRect } from '../models/dr-rect';
import { DrPolygon } from '../models/dr-polygon';
import { DrPoint } from '../models/dr-point';
import { DynamicSvgDirective } from '../dynamic-svg/dynamic-svg.directive';
import { select } from '@angular-redux/store';
import { DrImage } from '../models/dr-image';
import { ActionCreators } from 'redux-undo';
import { DataStoreService } from '../services/data-store.service';
import { DrawerObjectHelperService } from '../services/drawer-object-helper.service';
import { BoundingBox } from '../models/bounding-box';


@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  entryComponents: []
})
export class DrawerComponent implements OnInit {


  @select() elementState;



  @Output()
  public clickedObject: EventEmitter<DrObject> = new EventEmitter<DrObject>();


  t: DrRect = null;

  constructor(
    private _dataService: DataStoreService, 
    private _objectHelperService: DrawerObjectHelperService,
    private _componentFactoryResolver: ComponentFactoryResolver
    
  )
     { }

  ngOnInit() {
  }

  @Input()
  set elements(elements: DrObject[]) {
    this._dataService.elements = elements;
  }
  get elements(): DrObject[] { 
    return  this._dataService.elements;
  }

  onBackgroundClick(evt): void {
    this._dataService.handleClickedObject(null);
  }

  onBackgroundMouseDown(evt): void {
    this._dataService.handleMouseDownObject(null);
  }

  onBackgroundMouseMove(evt): void {
    this._dataService.handleMouseMoveObject(null);
  }

  onBackgroundMouseUp(evt): void {
    this._dataService.handleMouseUpObject(null);
  }

  onClick(data:DrObject): void {
    if(data !== null && typeof data !== 'undefined'){
      //this.clickedObject.emit(data);
      this._dataService.handleClickedObject(data);
    }
  }

  onMouseDown(data:DrObject): void {
    if(data !== null && typeof data !== 'undefined'){
      //this.clickedObject.emit(data);
      this._dataService.handleMouseDownObject(data);
    }
  }

  onMouseMove(data:DrObject): void {
    if(data !== null && typeof data !== 'undefined'){
      //this.clickedObject.emit(data);
      this._dataService.handleMouseMoveObject(data);
    }
  }

  onMouseUp(data:DrObject): void {
    if(data !== null && typeof data !== 'undefined'){
      //this.clickedObject.emit(data);
      this._dataService.handleMouseUpObject(data);
    }
  }
}


