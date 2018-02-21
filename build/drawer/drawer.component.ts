import { NgModule, ModuleWithProviders, Component, OnInit, ViewChild, ElementRef, ComponentFactoryResolver, Input } from '@angular/core';

import { DrEllipse } from '../models/dr-ellipse';
import { DrObject } from '../models/dr-object';
import { DrRect } from '../models/dr-rect';
import { DrPolygon } from '../models/dr-polygon';
import { Point } from '../models/point';
import { DrRectComponent } from '../elements/dr-rect/dr-rect.component';
import { DynamicSvgDirective } from '../dynamic-svg/dynamic-svg.directive';


@Component({
  selector: 'app-drawer',
  template: "\n\n    <ng-container *ngIf=\"widthValue !== null && heightValue !== null && viewTopValue !== null && viewWidthValue !== null && viewHeightValue !== null && viewLeftValue !== null\">\n      <svg #container xmlns=\"http://www.w3.org/2000/svg\" attr.width=\"{{ widthValue }}\" attr.height=\"{{ heightValue }}\" attr.viewBox=\"{{ getViewBoxValues() }}\">\n        <ng-container *ngFor=\"let s of elements\">\n          <ng-container dynamic-svg [componentData]=\"s\" (click)=\"onClick($event)\"></ng-container>\n        </ng-container>\n      </svg>\n    </ng-container>\n  ",
  styles: ["\n\n  "]
})
export class DrawerComponent implements OnInit {

  @ViewChild('container') container: ElementRef;

  @Input()
  public elements:DrObject[] = null;

  @Input()
  public widthValue: string = null;

  @Input()
  public heightValue: string = null;

  @Input()
  public viewWidthValue: string = null;

  @Input()
  public viewHeightValue: string = null;

  @Input()
  public viewTopValue: string = null;

  @Input()
  public viewLeftValue: string = null;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) { }
  //constructor() {}
  
  ngOnInit() {
    
  }

  onRectClick(): void {
    console.log("CLICK");
  }

  onClick(data:DrObject): void {
    console.log(data);
  }

  getViewBoxValues(): string {
    return this.viewTopValue + " " + this.viewLeftValue + " " + this.viewWidthValue + " " + this.viewHeightValue;
  }
}


