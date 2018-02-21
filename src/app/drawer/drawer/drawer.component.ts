import { NgModule, ModuleWithProviders, Component, OnInit, ViewChild, ElementRef, ComponentFactoryResolver, Input, Output, EventEmitter } from '@angular/core';

import { DrEllipse } from '../models/dr-ellipse';
import { DrObject } from '../models/dr-object';
import { DrRect } from '../models/dr-rect';
import { DrPolygon } from '../models/dr-polygon';
import { DrPoint } from '../models/dr-point';
import { DrRectComponent } from '../elements/dr-rect/dr-rect.component';
import { DynamicSvgDirective } from '../dynamic-svg/dynamic-svg.directive';


@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
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

  @Output()
  public clickedObject: EventEmitter<DrObject> = new EventEmitter<DrObject>();

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) { }
  //constructor() {}
  
  ngOnInit() {
    
  }

  onRectClick(): void {
    console.log("CLICK");
  }

  onClick(data:DrObject): void {
    if(data !== null && typeof data !== 'undefined'){
      console.log(data);
      this.clickedObject.emit(data);
    }
  }

  getViewBoxValues(): string {
    return this.viewTopValue + " " + this.viewLeftValue + " " + this.viewWidthValue + " " + this.viewHeightValue;
  }
}


