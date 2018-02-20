import { OnInit, ViewContainerRef, ComponentFactoryResolver, EventEmitter } from '@angular/core';
import { DrObject } from '../models/dr-object';
export declare class DynamicSvgDirective implements OnInit {
    private _viewContainerRef;
    _currentId: number;
    _currentComponent: any;
    ngOnInit(): void;
    click: EventEmitter<DrObject>;
    resolver: ComponentFactoryResolver;
    componentData: DrObject;
    private buildComponent(data);
    constructor(_viewContainerRef: ViewContainerRef);
}
