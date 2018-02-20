import { Component, OnInit, ViewChild, ElementRef, ComponentFactoryResolver, Input } from '@angular/core';

import { DrEllipse } from '../models/dr-ellipse';
import { DrObject } from '../models/dr-object';
import { DrRect } from '../models/dr-rect';
import { DrPolygon } from '../models/dr-polygon';
import { Point } from '../models/point';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {

  @ViewChild('container') container: ElementRef;

  @Input()
  elements:DrObject[] = null;

  //constructor(private _componentFactoryResolver: ComponentFactoryResolver) { }
  constructor() {}
  
  ngOnInit() {
    
  }

  onRectClick(): void {
    console.log("CLICK");
  }

  onClick(data:DrObject): void {
    console.log(data);
  }
}
