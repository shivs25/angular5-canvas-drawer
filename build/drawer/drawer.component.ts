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
  template: "\n\n    <div class=\"absolute-position fill-parent\">\n    \n        <svg \n              (mousedown)=\"onBackgroundMouseDown($event)\"\n              (mousemove)=\"onBackgroundMouseMove($event)\" \n              (mouseup)=\"onBackgroundMouseUp($event)\"\n              class=\"absolute-position fill-parent\" xmlns=\"http://www.w3.org/2000/svg\" version=\"1.2\" \n              [attr.viewBox]=\"getViewBox()\">\n          <ng-container *ngFor=\"let s of (elementState | async)?.present.elements; let i = index\">\n            <ng-container *ngIf=\"s.visible && !isHiddenSelection(s.id)\" dynamic-svg \n        \n            [allowCustomComponents]=\"allowCustomComponents\"\n            [componentData]=\"s\" \n            [overrideProperties]=\"overrideProperties\" [elementId]=\"s.id\"\n              [hoverClass]=\"hoverClass\"\n              (mouseDown)=\"onMouseDown($event)\"\n              (mouseMove)=\"onMouseMove($event)\"\n              (mouseUp)=\"onMouseUp($event)\"\n          \n              >\n            </ng-container>\n          </ng-container>\n        </svg>\n    </div>\n  ",
  styles: ["\n\n  "],
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


