import { OnInit, ViewContainerRef, ComponentFactoryResolver, EventEmitter } from '@angular/core';
import { DrObject } from '../models/dr-object';
import { MouseEventData } from '../models/mouse-event-data';
export declare class DynamicSvgDirective implements OnInit {
    private _viewContainerRef;
    private _resolver;
    _currentId: number;
    _currentComponent: any;
    ngOnInit(): void;
    hoverClass: string;
    overrideProperties: any;
    click: EventEmitter<DrObject>;
    mouseDown: EventEmitter<MouseEventData>;
    mouseMove: EventEmitter<MouseEventData>;
    mouseUp: EventEmitter<MouseEventData>;
    componentData: any;
    private buildComponent(data);
    constructor(_viewContainerRef: ViewContainerRef, _resolver: ComponentFactoryResolver);
}
