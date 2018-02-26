import { OnInit, ElementRef, ComponentFactoryResolver, EventEmitter } from '@angular/core';
import { DrObject } from '../models/dr-object';
export declare class DrawerComponent implements OnInit {
    private _componentFactoryResolver;
    container: ElementRef;
    elements: DrObject[];
    widthValue: string;
    heightValue: string;
    viewBoxWidthValue: string;
    viewBoxHeightValue: string;
    viewBoxYValue: string;
    viewBoxXValue: string;
    preserveAspectRatioValue: string;
    clickedObject: EventEmitter<DrObject>;
    constructor(_componentFactoryResolver: ComponentFactoryResolver);
    ngOnInit(): void;
    onRectClick(): void;
    onClick(data: DrObject): void;
    getViewBoxValues(): string;
    private isNullOrEmpty(s);
}
