import { NgModule, ModuleWithProviders, Component, OnInit, ViewChild, ElementRef, ComponentFactoryResolver, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';

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
  allowCustomComponents: boolean = true;

  @Input()
  overrideProperties: any = null;

  @Input()
  hoverClass: any = '';

  @Input()
  handleMouseEvents: boolean = true;

  @Input()
  viewBox: BoundingBox = null;

  @Output()
  clickedObject: EventEmitter<DrObject> = new EventEmitter<DrObject>();
  
  @Output()
  mouseDownObject: EventEmitter<MouseEventData> = new EventEmitter<MouseEventData>();

  @Output()
  mouseMoveObject: EventEmitter<MouseEventData> = new EventEmitter<MouseEventData>();
  
  @Output()
  mouseUpObject: EventEmitter<MouseEventData> = new EventEmitter<MouseEventData>();
  
  private _location: DrPoint = null;

  constructor(
    private _dataService: DataStoreService,
    private _elementRef: ElementRef
  )
     { }

  ngOnInit() {
    let b: any = this._elementRef.nativeElement.getBoundingClientRect();

    this._location = {
      x: b.left,
      y: b.top
    };
  }

  getSvgAsText(): string {
    return this._elementRef.nativeElement.querySelector("svg").innerHTML; 
  }

  isHiddenSelection(id: number) {
    return this._dataService.hideSelection && (this._dataService.selectedObjects.find((t: any) => t.id === id));
  }

  onBackgroundClick(evt): void {
    this.handleMouseEvents && this.clickedObject.emit(null);
  }

  onBackgroundMouseDown(evt): void {
    this.handleMouseEvents && this.mouseDownObject.emit({ 
      location: { 
        x: evt.offsetX, y: evt.offsetY 
      }, 
      data: null,
      shiftKey: evt.shiftKey,
      ctrlKey: evt.ctrlKey,
      altKey: evt.altKey
    });
  }

  onBackgroundMouseMove(evt): void {
    this.handleMouseEvents && this.mouseMoveObject.emit({ 
      location: { 
        x: evt.offsetX, y: evt.offsetY 
      }, 
      data: null,
      shiftKey: evt.shiftKey,
      ctrlKey: evt.ctrlKey,
      altKey: evt.altKey
    });
  }

  onBackgroundMouseUp(evt): void {
    this.handleMouseEvents && this.mouseUpObject.emit({ 
      location: { 
        x: evt.offsetX, y: evt.offsetY 
      }, 
      data: null,
      shiftKey: evt.shiftKey,
      ctrlKey: evt.ctrlKey,
      altKey: evt.altKey
    });
  }

  onClick(data: DrObject): void {
    
    if(this.handleMouseEvents && data !== null && typeof data !== 'undefined'){
      this.clickedObject.emit(data);
    }
  }

  onMouseDown(data:MouseEventData): void {
    if(this.handleMouseEvents && data !== null && typeof data !== 'undefined'){
      data.location.x = data.location.x - this._location.x;
      data.location.y = data.location.y - this._location.y;
      this.mouseDownObject.emit(data);
    }
  }

  onMouseMove(data:MouseEventData): void {
    if(this.handleMouseEvents && data !== null && typeof data !== 'undefined'){
      data.location.x = data.location.x - this._location.x;
      data.location.y = data.location.y - this._location.y;
      this.mouseMoveObject.emit(data);
    }
  }

  onMouseUp(data:MouseEventData): void {
    if(data !== null && typeof data !== 'undefined'){
      data.location.x = data.location.x - this._location.x;
      data.location.y = data.location.y - this._location.y;
      this.mouseUpObject.emit(data);
    }
  }

  getViewBox(): string {
    if(null === this.viewBox || 'undefined' === typeof this.viewBox){
      return null;
    } else {
      return this.viewBox.x + " " + this.viewBox.y + " " + this.viewBox.width + " " + this.viewBox.height;
    }

  }
}


