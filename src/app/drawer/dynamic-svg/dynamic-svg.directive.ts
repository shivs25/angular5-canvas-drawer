import { Directive, OnInit, ViewContainerRef, ComponentFactoryResolver, Input, ReflectiveInjector, EventEmitter, Output } from '@angular/core';
import { DrObject } from '../models/dr-object';
import { DrRect } from '../models/dr-rect';
import { DrEllipse } from '../models/dr-ellipse';

import { DrObjectComponent } from '../elements/dr-object/dr-object.component';
import { DrRectComponent } from '../elements/dr-rect/dr-rect.component';
import { DrEllipseComponent } from '../elements/dr-ellipse/dr-ellipse.component';
import { DrPolygon } from '../models/dr-polygon';
import { DrPolygonComponent } from '../elements/dr-polygon/dr-polygon.component';
import { DrText } from '../models/dr-text';
import { DrTextComponent } from '../elements/dr-text/dr-text.component';
import { DrImage } from '../models/dr-image';
import { DrImageComponent } from '../elements/dr-image/dr-image.component';
import { DrType } from '../models/dr-type.enum';
import { MouseEventData } from '../models/mouse-event-data';

@Directive({
  selector: '[dynamic-svg]'
})
export class DynamicSvgDirective implements OnInit {

  _currentId: number;
  _currentComponent: any = null;

  ngOnInit() {
  }

  @Input() 
  hoverClass: string = 'pointer';

  @Input()
  overrideProperties: any;

  @Input()
  elementId: any;

  @Input()
  canInteract: boolean = true;

  @Output()
  click: EventEmitter<DrObject> = new EventEmitter<DrObject>();

  @Output()
  mouseDown: EventEmitter<MouseEventData> = new EventEmitter<MouseEventData>();

  @Output()
  mouseMove: EventEmitter<MouseEventData> = new EventEmitter<MouseEventData>();

  @Output()
  mouseUp: EventEmitter<MouseEventData> = new EventEmitter<MouseEventData>();

  @Input() set componentData(data: any) {
    /*if (!data || data.id === this._currentId) {
        return;
    }*/
    
    // We create an injector out of the data we want to pass down and this components injector
    let injector = ReflectiveInjector.fromResolvedProviders([], this._viewContainerRef.parentInjector);

    // We create a factory out of the component we want to create
    let factory = this._resolver.resolveComponentFactory(this.buildComponent(data));

    // We create the component using the factory and the injector
    let component = factory.create(injector);

    // We insert the component into the dom container

    let c: DrObjectComponent = <DrObjectComponent>component.instance;
    
    c.visualData = Object.assign({}, data, this.overrideProperties ? this.overrideProperties : {});
    c.data = data;
    c.hoverClass = this.hoverClass;
    c.canInteract = this.canInteract;

    c.ngOnInit();
    c.click.subscribe((s:any) => {
      this.click.emit(s);
    });
    c.mouseDown.subscribe((s:any) => {
      this.mouseDown.emit(s);
    });
    c.mouseMove.subscribe((s:any) => {
      this.mouseMove.emit(s);
    }); c.mouseUp.subscribe((s:any) => {
      this.mouseUp.emit(s);
    });
    c.elementId = this.elementId;

    this._viewContainerRef.clear();
    this._viewContainerRef.createEmbeddedView(c.elementTemplate);

    // We can destroy the old component is we like by calling destroy
    if (this._currentComponent) {
        this._currentComponent.destroy();
    }

    this._currentId = data.id;
    this._currentComponent = component;
  }

  private buildComponent(data: DrObject): any {
    let returnValue: any = null;

    switch(data.drType) {
      case DrType.TEXT:
        return  DrTextComponent;
      case DrType.IMAGE:
        return  DrImageComponent;
      case DrType.ELLIPSE:
        return  DrEllipseComponent;
      case DrType.POLYGON:
        return DrPolygonComponent;
      case DrType.RECTANGLE:
        return  DrRectComponent;
    }
    return null;
  }

  constructor(private _viewContainerRef: ViewContainerRef, private _resolver: ComponentFactoryResolver) {  
  }

  
}