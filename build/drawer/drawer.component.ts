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

@Component({
  selector: 'app-drawer',
  template: "\n\n    <div class=\"absolute-position fill-parent\">\n        <app-editor-tool></app-editor-tool>\n        <svg class=\"absolute-position fill-parent\" xmlns=\"http://www.w3.org/2000/svg\">\n          <ng-container *ngFor=\"let s of (elementState | async)?.present.elements\">\n            <ng-container *ngIf=\"s.visible\" dynamic-svg [componentData]=\"s\" (click)=\"onClick($event)\"></ng-container>\n          </ng-container>\n        </svg>\n    </div>\n  ",
  styles: ["\n\n  "],
  entryComponents: []
})
export class DrawerComponent implements OnInit {

  @select() elementState;

  @Output()
  public clickedObject: EventEmitter<DrObject> = new EventEmitter<DrObject>();

  t: DrRect = null;

  constructor(private _dataService: DataStoreService, private _componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  @Input()
  set elements(elements: DrObject[]) {
    this._dataService.elements = elements;
  }
  get elements(): DrObject[] { 
    return  this._dataService.elements;
  }

  onClick(data:DrObject): void {
    if(data !== null && typeof data !== 'undefined'){
      this.clickedObject.emit(data);
    }
  }
}


