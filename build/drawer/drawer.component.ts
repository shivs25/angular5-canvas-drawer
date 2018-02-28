import { NgModule, ModuleWithProviders, Component, OnInit, ViewChild, ElementRef, ComponentFactoryResolver, Input, Output, EventEmitter } from '@angular/core';

import { DrEllipse } from '../models/dr-ellipse';
import { DrObject } from '../models/dr-object';
import { DrRect } from '../models/dr-rect';
import { DrPolygon } from '../models/dr-polygon';
import { DrPoint } from '../models/dr-point';
import { DynamicSvgDirective } from '../dynamic-svg/dynamic-svg.directive';
import { NgRedux, select } from '@angular-redux/store';
import { IDrawerAppState } from '../store';
import { SET_ELEMENTS, MOVE_OBJECT } from '../actions';
import { DrImage } from '../models/dr-image';


@Component({
  selector: 'app-drawer',
  template: "\n\n    <ng-container>\n      <svg #container xmlns=\"http://www.w3.org/2000/svg\" \n        [attr.width]=\"widthValue !== null ? widthValue : null\" \n        [attr.height]=\"heightValue !== null ? heightValue : null\" \n        [attr.viewBox]=\"getViewBoxValues() !== null ? getViewBoxValues() : null\" \n        [attr.preserveAspectRatio]=\"preserveAspectRatioValue !== null ? preserveAspectRatioValue : null\">\n        <ng-container *ngFor=\"let s of items | async\">\n          <ng-container *ngIf=\"s.visible\" dynamic-svg [componentData]=\"s\" (click)=\"onClick($event)\"></ng-container>\n        </ng-container>\n      </svg>\n    </ng-container>\n  ",
  styles: ["\n\n  "]
})
export class DrawerComponent implements OnInit {

  @ViewChild('container') container: ElementRef;

  @select('elements') items: any;

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

  constructor(private ngRedux: NgRedux<IDrawerAppState>, private _componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    
  }

  @Input()
  set elements(elements: DrObject[]) {
    this.ngRedux.dispatch({ type: SET_ELEMENTS, elements: elements });
  }

  onClick(data:DrObject): void {
    if(data !== null && typeof data !== 'undefined'){
      console.log(data);
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


