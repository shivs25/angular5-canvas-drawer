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

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) { }
  //constructor() {}
  
  ngOnInit() {

    
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


