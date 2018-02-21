import { OnInit, ElementRef, ComponentFactoryResolver } from '@angular/core';
import { DrObject } from '../models/dr-object';
export declare class DrawerComponent implements OnInit {
    private _componentFactoryResolver;
    container: ElementRef;
    elements: DrObject[];
    constructor(_componentFactoryResolver: ComponentFactoryResolver);
    ngOnInit(): void;
    onRectClick(): void;
    onClick(data: DrObject): void;
}
