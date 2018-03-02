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
import { MouseEventData } from '../models/mouse-event-data';


@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  entryComponents: []
})
export class DrawerComponent implements OnInit {


  @select() elementState;

  @Input()
  overrideProperties: any = null;

  @Input()
  hoverClass: any = null;

  @Input()
  handleMouseEvents: boolean = true;

  @Output()
  public clickedObject: EventEmitter<DrObject> = new EventEmitter<DrObject>();

  @Input()
  set elements(elements: DrObject[]) {
    this._dataService.elements = elements;
  }
  get elements(): DrObject[] { 
    return  this._dataService.elements;
  }

  constructor(
    private _dataService: DataStoreService
    
  )
     { }

  ngOnInit() {
  }

 

  onBackgroundClick(evt): void {
    this.handleMouseEvents && this._dataService.handleClickedObject(null);
  }

  onBackgroundMouseDown(evt): void {
    this.handleMouseEvents && this._dataService.handleMouseDownObject({ location: { x: evt.clientX, y: evt.clientY }, data: null });
  }

  onBackgroundMouseMove(evt): void {
    this.handleMouseEvents && this._dataService.handleMouseMoveObject({ location: { x: evt.clientX, y: evt.clientY }, data: null });
  }

  onBackgroundMouseUp(evt): void {
    this.handleMouseEvents && this._dataService.handleMouseUpObject({ location: { x: evt.clientX, y: evt.clientY }, data: null });
  }

  onClick(data: DrObject): void {
    if(this.handleMouseEvents && data !== null && typeof data !== 'undefined'){
      //this.clickedObject.emit(data);
      this._dataService.handleClickedObject(data);
    }
  }

  onMouseDown(data:MouseEventData): void {
    if(this.handleMouseEvents && data !== null && typeof data !== 'undefined'){
      //this.clickedObject.emit(data);
      this._dataService.handleMouseDownObject(data);
    }
  }

  onMouseMove(data:MouseEventData): void {
    if(this.handleMouseEvents && data !== null && typeof data !== 'undefined'){
      //this.clickedObject.emit(data);
      this._dataService.handleMouseMoveObject(data);
    }
  }

  onMouseUp(data:MouseEventData): void {
    if(data !== null && typeof data !== 'undefined'){
      //this.clickedObject.emit(data);
      this._dataService.handleMouseUpObject(data);
    }
  }
}


