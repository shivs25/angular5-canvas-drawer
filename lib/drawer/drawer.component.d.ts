import { OnInit, ElementRef, ComponentFactoryResolver } from '@angular/core';
import { DrObject } from '../models/dr-object';
export declare class DrawerComponent implements OnInit {
    componentFactoryResolver: ComponentFactoryResolver;
    container: ElementRef;
    elements: DrObject[];
    constructor(componentFactoryResolver: ComponentFactoryResolver);
    ngOnInit(): void;
    onRectClick(): void;
    onClick(data: DrObject): void;
}
