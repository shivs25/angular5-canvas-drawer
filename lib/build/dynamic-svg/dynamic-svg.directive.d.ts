import { OnInit, ViewContainerRef, ComponentFactoryResolver, EventEmitter } from '@angular/core';
import { DrObject } from '../models/dr-object';
import { MouseEventData } from '../models/mouse-event-data';
export declare class DynamicSvgDirective implements OnInit {
    private _viewContainerRef;
    private _resolver;
    _currentId: number;
    _currentComponent: any;
    ngOnInit(): void;
    readonly currentComponent: any;
    hoverClass: string;
    overrideProperties: any;
    elementId: any;
    canInteract: boolean;
    click: EventEmitter<DrObject>;
    mouseDown: EventEmitter<MouseEventData>;
    mouseMove: EventEmitter<MouseEventData>;
    mouseUp: EventEmitter<MouseEventData>;
    componentData: any;
    private buildComponent(data);
    constructor(_viewContainerRef: ViewContainerRef, _resolver: ComponentFactoryResolver);
}
