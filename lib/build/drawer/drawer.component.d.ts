import { OnInit, ElementRef, ComponentFactoryResolver } from '@angular/core';
import { DrObject } from '../models/dr-object';
export declare class DrawerComponent implements OnInit {
    private _componentFactoryResolver;
    container: ElementRef;
    elements: DrObject[];
    widthValue: string;
    heightValue: string;
    viewWidthValue: string;
    viewHeightValue: string;
    viewTopValue: string;
    viewLeftValue: string;
    constructor(_componentFactoryResolver: ComponentFactoryResolver);
    ngOnInit(): void;
    onRectClick(): void;
    onClick(data: DrObject): void;
    getViewBoxValues(): string;
}
