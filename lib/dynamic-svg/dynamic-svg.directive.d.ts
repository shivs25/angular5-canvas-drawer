import { OnInit, ViewContainerRef, ComponentFactoryResolver, EventEmitter } from '@angular/core';
import { DrObject } from '../models/dr-object';
export declare class DynamicSvgDirective implements OnInit {
    private _viewContainerRef;
    private _resolver;
    _currentId: number;
    _currentComponent: any;
    ngOnInit(): void;
    click: EventEmitter<DrObject>;
    componentData: DrObject;
    private buildComponent(data);
    constructor(_viewContainerRef: ViewContainerRef, _resolver: ComponentFactoryResolver);
}
