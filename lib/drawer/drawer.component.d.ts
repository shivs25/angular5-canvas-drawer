import { OnInit, ElementRef } from '@angular/core';
import { DrObject } from '../models/dr-object';
export declare class DrawerComponent implements OnInit {
    container: ElementRef;
    elements: DrObject[];
    constructor();
    ngOnInit(): void;
    onRectClick(): void;
    onClick(data: DrObject): void;
}
