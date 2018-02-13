import { Directive, OnInit, ViewContainerRef, ComponentFactoryResolver, Input, ReflectiveInjector, EventEmitter, Output } from '@angular/core';
import { DrObject } from '../models/dr-object';
import { DrRect } from '../models/dr-rect';
import { DrEllipse } from '../models/dr-ellipse';

import { DrObjectComponent } from '../elements/dr-object/dr-object.component';
import { DrRectComponent } from '../elements/dr-rect/dr-rect.component';
import { DrEllipseComponent } from '../elements/dr-ellipse/dr-ellipse.component';
import { DrPolygon } from '../models/dr-polygon';
import { DrPolygonComponent } from '../elements/dr-polygon/dr-polygon.component';

@Directive({
  selector: '[dynamic-svg]'
})
export class DynamicSvgDirective implements OnInit {

  _currentId: number;
  _currentComponent = null;

  ngOnInit() {
  }

  @Output()
  public click: EventEmitter<DrObject> = new EventEmitter<DrObject>();

  @Input() set componentData(data: DrObject) {
    if (!data || data.id === this._currentId) {
        return;
    }

    // We create an injector out of the data we want to pass down and this components injector
    let injector = ReflectiveInjector.fromResolvedProviders([], this._viewContainerRef.parentInjector);

    // We create a factory out of the component we want to create
    let factory = this._resolver.resolveComponentFactory(this.buildComponent(data));

    // We create the component using the factory and the injector
    let component = factory.create(injector);

    // We insert the component into the dom container
    

    let c: DrObjectComponent = <DrObjectComponent>component.instance;
    c.data = data;
    c.click.subscribe((s) => {
      this.click.emit(s);
    });

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
    if (data instanceof DrRect) {
      returnValue = DrRectComponent;
    }
    else if(data instanceof DrEllipse) {
      returnValue = DrEllipseComponent;
    }
    else if (data instanceof DrPolygon) {
      returnValue  = DrPolygonComponent;
    }
    return returnValue;
  }

  constructor(private _viewContainerRef: ViewContainerRef, private _resolver: ComponentFactoryResolver) {  
  }

  
}
