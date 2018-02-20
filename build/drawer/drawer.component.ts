import { Component, OnInit, ViewChild, ElementRef, ComponentFactoryResolver, Input } from '@angular/core';

import { DrEllipse } from '../models/dr-ellipse';
import { DrObject } from '../models/dr-object';
import { DrRect } from '../models/dr-rect';
import { DrPolygon } from '../models/dr-polygon';
import { Point } from '../models/point';

@Component({
  selector: 'app-drawer',
  template: "\n\n    <svg #container xmlns=\"http://www.w3.org/2000/svg\" width=\"400\" height=\"400\" viewBox=\"0 0 400 400\">\n      <ng-container *ngFor=\"let s of elements\">\n        <ng-container dynamic-svg [componentData]=\"s\" (click)=\"onClick($event)\"></ng-container>\n      </ng-container>\n    </svg>\n  ",
  styles: ["\n\n  "]
})
export class DrawerComponent implements OnInit {

  @ViewChild('container') container: ElementRef;

  @Input()
  elements:DrObject[] = null;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    
  }

  onRectClick(): void {
    console.log("CLICK");
  }

  onClick(data:DrObject): void {
    console.log(data);
  }
}
