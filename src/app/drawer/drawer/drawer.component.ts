import { NgModule, ModuleWithProviders, Component, OnInit, ViewChild, ElementRef, ComponentFactoryResolver, Input, Output, EventEmitter } from '@angular/core';

import { DrEllipse } from '../models/dr-ellipse';
import { DrObject } from '../models/dr-object';
import { DrRect } from '../models/dr-rect';
import { DrPolygon } from '../models/dr-polygon';
import { DrPoint } from '../models/dr-point';
import { DynamicSvgDirective } from '../dynamic-svg/dynamic-svg.directive';
import { NgRedux, select } from '@angular-redux/store';
import { IDrawerAppState } from '../store';
import { SET_ELEMENTS, CHANGE_OBJECT_BOUNDS } from '../actions';
import { DrImage } from '../models/dr-image';
import { ActionCreators } from 'redux-undo';
import { DataStoreService } from '../services/data-store.service';


@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {

  @ViewChild('container') container: ElementRef;

  @select() elementState;

  @Input()
  public widthValue: string = null;

  @Input()
  public heightValue: string = null;

  @Input()
  public viewBoxWidthValue: string = null;

  @Input()
  public viewBoxHeightValue: string = null;

  @Input()
  public viewBoxYValue: string = null;

  @Input()
  public viewBoxXValue: string = null;

  @Input()
  public preserveAspectRatioValue: string = null;

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

  getViewBoxValues(): string {
    let r: string = null;

    if(!this.isNullOrEmpty(this.viewBoxXValue) && !this.isNullOrEmpty(this.viewBoxXValue) && !this.isNullOrEmpty(this.viewBoxXValue) && !this.isNullOrEmpty(this.viewBoxXValue)){
        r = this.viewBoxXValue + " " + this.viewBoxYValue + " " + this.viewBoxWidthValue + " " + this.viewBoxHeightValue;
    }

    return r;
  }

  private isNullOrEmpty(s:string): boolean{
   
    if(null !== s && s.length > 0){
      return false;
    }
    else{
      return true;
    }

  }
}


